"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, Eye, AlertCircle, RefreshCw, Box } from "lucide-react";
import { detectObjects } from "@/app/actions/cv";
import { DetectedObject } from "@/services/cv/types";

export function ObjectDetectionInterface() {
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
      'image/*': ['.png', '.jpg', '.jpeg', '.bmp', '.webp']
    },
    maxFiles: 1,
    multiple: false
  });

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight, width, height } = e.currentTarget;
    setImageSize({ width, height });
  };
  
  // Update image size on resize
  useEffect(() => {
    const updateSize = () => {
      if (imageRef.current) {
        setImageSize({
          width: imageRef.current.width,
          height: imageRef.current.height
        });
      }
    };
    
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleProcess = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);
    setDetections([]);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await detectObjects(formData);

      if (response.error) {
        setError(response.error);
      } else if (response.detections) {
        setDetections(response.detections);
      }
    } catch (err: unknown) {
      console.error("Client Error:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred. Please try again."
      );
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

  // Calculate scaling factor for bounding boxes
  const getScale = () => {
    if (!imageRef.current || !imageSize) return { x: 1, y: 1 };
    return {
      x: imageRef.current.width / imageRef.current.naturalWidth,
      y: imageRef.current.height / imageRef.current.naturalHeight
    };
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card className="bg-surface/50 border-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Upload Image for Detection
          </CardTitle>
          <CardDescription>
            Upload an image to detect objects using COCO-SSD (80+ classes).
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!file ? (
            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-all duration-200
                ${isDragActive ? 'border-primary bg-primary/5' : 'border-primary/20 hover:border-primary/50 hover:bg-surface/80'}
              `}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 rounded-full bg-accent/10">
                  <Upload className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <p className="text-lg font-medium text-foreground">
                    {isDragActive ? "Drop the image here" : "Drag & drop an image here"}
                  </p>
                  <p className="text-sm text-foreground/60 mt-1">
                    or click to select a file (PNG, JPG, BMP, WEBP)
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative rounded-lg overflow-hidden border border-primary/20 bg-black/20 flex items-center justify-center">
                {/* Image Container */}
                <div className="relative inline-block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={imageRef}
                    src={preview!}
                    alt="Preview"
                    onLoad={handleImageLoad}
                    className="max-w-full max-h-[600px] object-contain block"
                  />
                  
                  {/* Bounding Boxes Overlay */}
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

              {/* Controls & Results */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex gap-3">
                    <Button
                      onClick={handleProcess}
                      disabled={isProcessing}
                      className="flex-1 gradient-primary text-white"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Eye className="mr-2 h-4 w-4" />
                          Detect Objects
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      disabled={isProcessing}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Stats */}
                  {detections.length > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-surface p-3 rounded-md border border-primary/10 text-center">
                        <div className="text-2xl font-bold text-accent">{detections.length}</div>
                        <div className="text-xs text-foreground/60">Objects Detected</div>
                      </div>
                      <div className="bg-surface p-3 rounded-md border border-primary/10 text-center">
                        <div className="text-2xl font-bold text-primary">
                          {new Set(detections.map(d => d.class)).size}
                        </div>
                        <div className="text-xs text-foreground/60">Unique Classes</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Legend/List */}
                <div className="flex-1 bg-surface/30 rounded-lg p-4 border border-primary/10 max-h-[300px] overflow-y-auto">
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Box className="h-4 w-4" />
                    Detections List
                  </h4>
                  {detections.length === 0 ? (
                    <div className="text-sm text-foreground/40 italic text-center py-4">
                      {isProcessing ? "Processing image..." : "No objects detected yet"}
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
