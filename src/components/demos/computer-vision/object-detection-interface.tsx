"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { AlertCircle, Box, Eye, Loader2, RefreshCw, Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { detectObjects } from "@/app/actions/cv";
import { DetectedObject } from "@/services/cv/types";
import type { Locale } from "@/lib/i18n";

const copyByLocale = {
  es: {
    title: "Sube una imagen para deteccion",
    description: "Sube una imagen para detectar objetos con COCO-SSD (80+ clases).",
    dropActive: "Suelta la imagen aqui",
    dropIdle: "Arrastra y suelta una imagen aqui",
    dropHint: "o haz clic para seleccionar un archivo (PNG, JPG, BMP, WEBP)",
    analyzing: "Analizando...",
    detect: "Detectar objetos",
    detectedObjects: "Objetos detectados",
    uniqueClasses: "Clases unicas",
    detectionsList: "Lista de detecciones",
    processingImage: "Procesando imagen...",
    noDetections: "Aun no hay objetos detectados",
    unexpectedError: "Ocurrio un error inesperado. Intenta de nuevo.",
  },
  en: {
    title: "Upload Image for Detection",
    description: "Upload an image to detect objects using COCO-SSD (80+ classes).",
    dropActive: "Drop the image here",
    dropIdle: "Drag & drop an image here",
    dropHint: "or click to select a file (PNG, JPG, BMP, WEBP)",
    analyzing: "Analyzing...",
    detect: "Detect Objects",
    detectedObjects: "Objects Detected",
    uniqueClasses: "Unique Classes",
    detectionsList: "Detections List",
    processingImage: "Processing image...",
    noDetections: "No objects detected yet",
    unexpectedError: "An unexpected error occurred. Please try again.",
  },
} as const;

export function ObjectDetectionInterface({ locale = "en" }: { locale?: Locale }) {
  const copy = copyByLocale[locale];
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detections, setDetections] = useState<DetectedObject[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setDetections([]);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".bmp", ".webp"],
    },
    maxFiles: 1,
    multiple: false,
  });

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setImageSize({ width, height });
  };

  useEffect(() => {
    const updateSize = () => {
      if (imageRef.current) {
        setImageSize({
          width: imageRef.current.width,
          height: imageRef.current.height,
        });
      }
    };

    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleProcess = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);
    setDetections([]);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await detectObjects(formData);

      if (response.error) {
        setError(response.error);
      } else if (response.detections) {
        setDetections(response.detections);
      }
    } catch (err: unknown) {
      console.error("Client Error:", err);
      setError(err instanceof Error ? err.message : copy.unexpectedError);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setDetections([]);
    setError(null);
  };

  const getScale = () => {
    if (!imageRef.current || !imageSize) return { x: 1, y: 1 };
    return {
      x: imageRef.current.width / imageRef.current.naturalWidth,
      y: imageRef.current.height / imageRef.current.naturalHeight,
    };
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card className="bg-surface/50 border-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            {copy.title}
          </CardTitle>
          <CardDescription>{copy.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {!file ? (
            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-all duration-200
                ${isDragActive ? "border-primary bg-primary/5" : "border-primary/20 hover:border-primary/50 hover:bg-surface/80"}
              `}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 rounded-full bg-accent/10">
                  <Upload className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <p className="text-lg font-medium text-foreground">
                    {isDragActive ? copy.dropActive : copy.dropIdle}
                  </p>
                  <p className="text-sm text-foreground/60 mt-1">{copy.dropHint}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative rounded-lg overflow-hidden border border-primary/20 bg-black/20 flex items-center justify-center">
                <div className="relative inline-block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={imageRef}
                    src={preview!}
                    alt="Preview"
                    onLoad={handleImageLoad}
                    className="max-w-full max-h-[600px] object-contain block"
                  />

                  {detections.map((det, idx) => {
                    const scale = getScale();
                    const [x, y, w, h] = det.bbox;

                    return (
                      <motion.div
                        key={`${det.class}-${idx}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        className="absolute border-2 border-accent hover:bg-accent/10 transition-colors group cursor-pointer"
                        style={{
                          left: x * scale.x,
                          top: y * scale.y,
                          width: w * scale.x,
                          height: h * scale.y,
                        }}
                      >
                        <div className="absolute -top-7 left-0 bg-accent text-accent-foreground text-xs px-2 py-1 rounded font-mono font-bold whitespace-nowrap opacity-90 group-hover:opacity-100 flex items-center gap-1">
                          <span>{det.class}</span>
                          <span className="opacity-75">{(det.score * 100).toFixed(0)}%</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex gap-3">
                    <Button onClick={handleProcess} disabled={isProcessing} className="flex-1 gradient-primary text-white">
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {copy.analyzing}
                        </>
                      ) : (
                        <>
                          <Eye className="mr-2 h-4 w-4" />
                          {copy.detect}
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={handleReset} disabled={isProcessing}>
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>

                  {detections.length > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-surface p-3 rounded-md border border-primary/10 text-center">
                        <div className="text-2xl font-bold text-accent">{detections.length}</div>
                        <div className="text-xs text-foreground/60">{copy.detectedObjects}</div>
                      </div>
                      <div className="bg-surface p-3 rounded-md border border-primary/10 text-center">
                        <div className="text-2xl font-bold text-primary">
                          {new Set(detections.map((d) => d.class)).size}
                        </div>
                        <div className="text-xs text-foreground/60">{copy.uniqueClasses}</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 bg-surface/30 rounded-lg p-4 border border-primary/10 max-h-[300px] overflow-y-auto">
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Box className="h-4 w-4" />
                    {copy.detectionsList}
                  </h4>
                  {detections.length === 0 ? (
                    <div className="text-sm text-foreground/40 italic text-center py-4">
                      {isProcessing ? copy.processingImage : copy.noDetections}
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {detections.map((det, idx) => (
                        <li key={idx} className="flex items-center justify-between text-sm p-2 rounded hover:bg-white/5">
                          <span className="font-medium capitalize">{det.class}</span>
                          <span className="text-xs font-mono text-accent">{(det.score * 100).toFixed(1)}%</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {error && (
                    <div className="flex items-center gap-2 p-3 mt-2 text-destructive bg-destructive/10 rounded text-sm">
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
