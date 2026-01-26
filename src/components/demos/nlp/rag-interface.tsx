"use client";

import { useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Send, Loader2, X, AlertCircle, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { processDocumentAction, generateRAGResponseAction } from "@/app/actions/rag";
import { cn } from "@/lib/utils";
import type { ChatMessage, ProcessedDocument } from "@/lib/types";

interface RAGInterfaceProps {
  className?: string;
}

export function RAGInterface({ className }: RAGInterfaceProps) {
  const [file, setFile] = useState<File | null>(null);
  const [extractedContext, setExtractedContext] = useState<ProcessedDocument | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isGenerating]);

  const onDrop = async (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) return;

    if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
      setUploadError("File size exceeds 10MB limit.");
      return;
    }

    setFile(selectedFile);
    setIsProcessing(true);
    setUploadError(null);
    setExtractedContext(null);
    setChatHistory([]); // Reset chat on new file

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const result = await processDocumentAction(formData);
      
      if (result.error) {
        setUploadError(result.error);
        setFile(null);
      } else {
        setExtractedContext(result);
        // Add initial system greeting
        setChatHistory([
          { 
            role: 'model' as const, 
            parts: [{ text: `I've processed "${result.filename}". You can now ask me questions about its content.` }] 
          }
        ]);
      }
    } catch (err) {
      setUploadError("An unexpected error occurred during processing.");
      console.error(err);
      setFile(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    disabled: isProcessing || !!extractedContext // Disable upload if processed (user can reset)
  });

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputMessage.trim() || isGenerating || !extractedContext) return;

    const userMsg: ChatMessage = { role: 'user' as const, parts: [{ text: inputMessage }] };
    setChatHistory(prev => [...prev, userMsg]);
    setInputMessage("");
    setIsGenerating(true);

    try {
      if (!extractedContext) return;

      const response = await generateRAGResponseAction(
        chatHistory, // Pass history (server validates)
        extractedContext, // Pass context object
        userMsg.parts[0].text! // Pass current message
      );
      
      setChatHistory(prev => [...prev, response]);
    } catch (err) {
      console.error(err);
      setChatHistory(prev => [...prev, { 
        role: 'model' as const, 
        parts: [{ text: "Sorry, I encountered an error generating the response." }] 
      }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const resetSession = () => {
    setFile(null);
    setExtractedContext(null);
    setChatHistory([]);
    setUploadError(null);
    setInputMessage("");
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto space-y-6", className)}>
      
      {/* Upload Area */}
      {!extractedContext && (
        <Card className="border-2 border-dashed border-primary/20 bg-surface/50 hover:bg-surface/80 transition-colors">
          <div 
            {...getRootProps()} 
            className={cn(
              "p-10 flex flex-col items-center justify-center text-center cursor-pointer min-h-[300px]",
              isDragActive && "bg-primary/5",
              isProcessing && "cursor-not-allowed opacity-70"
            )}
          >
            <input {...getInputProps()} />
            
            {isProcessing ? (
              <div className="flex flex-col items-center space-y-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-lg font-medium">Processing document...</p>
                <p className="text-sm text-muted-foreground">Extracting text for analysis</p>
              </div>
            ) : (
              <>
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload Knowledge Base</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Drag & drop a PDF, DOCX, Image, or Text file here, or click to select.
                  <br/>
                  <span className="text-xs text-muted-foreground/70">(Max 10MB)</span>
                </p>
                <Button variant="secondary" className="pointer-events-none">
                  Select Document
                </Button>
              </>
            )}
            
            {uploadError && (
              <div className="mt-6 flex items-center text-destructive gap-2 bg-destructive/10 px-4 py-2 rounded-md">
                <AlertCircle className="h-4 w-4" />
                <span>{uploadError}</span>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Chat Interface */}
      {extractedContext && (
        <Card className="flex flex-col h-[600px] overflow-hidden border-primary/20 bg-surface/80 backdrop-blur-md shadow-xl">
          <CardHeader className="border-b border-primary/10 bg-surface/50 p-4 flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">{extractedContext.filename}</CardTitle>
                <CardDescription className="text-xs">Context loaded • Ready for questions</CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={resetSession} className="text-muted-foreground hover:text-destructive">
              <X className="h-4 w-4 mr-1" />
              Clear Context
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-hidden p-0 flex flex-col">
            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-6 bg-gradient-to-b from-background/50 to-background/80"
            >
              <AnimatePresence initial={false}>
                {chatHistory.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex gap-3 max-w-[85%]",
                      msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                    )}
                  >
                    <div className={cn(
                      "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                      msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
                    )}>
                      {msg.role === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                    </div>
                    <div className={cn(
                      "p-3 rounded-2xl text-sm leading-relaxed",
                      msg.role === 'user' 
                        ? "bg-primary text-primary-foreground rounded-tr-sm" 
                        : "bg-surface border border-primary/10 rounded-tl-sm shadow-sm"
                    )}>
                      {msg.parts[0]?.text}
                      {msg.parts[0]?.inlineData && (
                        <div className="mt-2">
                          <img 
                            src={`data:${msg.parts[0].inlineData.mimeType};base64,${msg.parts[0].inlineData.data}`} 
                            alt="Uploaded context" 
                            className="max-w-full h-auto rounded-lg border border-primary/20"
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isGenerating && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 max-w-[85%] mr-auto"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div className="p-3 rounded-2xl bg-surface border border-primary/10 rounded-tl-sm shadow-sm flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-200" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-primary/10 bg-surface/50">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask a question about the document..."
                  className="flex-1 bg-background border border-input rounded-md px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isGenerating}
                />
                <Button type="submit" size="icon" disabled={!inputMessage.trim() || isGenerating}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
