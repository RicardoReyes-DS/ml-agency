"use client";

import { useEffect, useState } from "react";
import { usePerformanceMonitor } from "@/hooks/use-performance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Zap, Eye, Clock } from "lucide-react";

interface PerformanceMonitorProps {
  showDetails?: boolean;
  className?: string;
}

export function PerformanceMonitor({ showDetails = false, className }: PerformanceMonitorProps) {
  const metrics = usePerformanceMonitor();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development or when explicitly requested
    if (process.env.NODE_ENV === 'development' || window.location.search.includes('perf=true')) {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) return null;

  const getScoreColor = (value: number, thresholds: { good: number; poor: number }) => {
    if (value <= thresholds.good) return "text-green-500";
    if (value <= thresholds.poor) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreBadge = (value: number, thresholds: { good: number; poor: number }) => {
    if (value <= thresholds.good) return "Good";
    if (value <= thresholds.poor) return "Needs Work";
    return "Poor";
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <Card className="w-80 bg-surface/95 backdrop-blur-sm border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Activity className="h-4 w-4 text-primary" />
            Performance Monitor
            <Badge variant="outline" className="ml-auto text-xs">
              Dev Mode
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Core Web Vitals */}
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 bg-surface/50 rounded">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Eye className="h-3 w-3" />
                <span className="text-xs font-medium">FCP</span>
              </div>
              <div className={`text-lg font-bold font-mono ${getScoreColor(metrics.fcp || 0, { good: 1800, poor: 3000 })}`}>
                {metrics.fcp ? `${Math.round(metrics.fcp)}ms` : '--'}
              </div>
              <Badge variant="outline" className="text-xs mt-1">
                {metrics.fcp ? getScoreBadge(metrics.fcp, { good: 1800, poor: 3000 }) : 'Loading'}
              </Badge>
            </div>

            <div className="text-center p-2 bg-surface/50 rounded">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Zap className="h-3 w-3" />
                <span className="text-xs font-medium">LCP</span>
              </div>
              <div className={`text-lg font-bold font-mono ${getScoreColor(metrics.lcp || 0, { good: 2500, poor: 4000 })}`}>
                {metrics.lcp ? `${Math.round(metrics.lcp)}ms` : '--'}
              </div>
              <Badge variant="outline" className="text-xs mt-1">
                {metrics.lcp ? getScoreBadge(metrics.lcp, { good: 2500, poor: 4000 }) : 'Loading'}
              </Badge>
            </div>
          </div>

          {/* Additional Metrics */}
          {showDetails && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 bg-surface/50 rounded">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs font-medium">FID</span>
                  </div>
                  <div className={`text-lg font-bold font-mono ${getScoreColor(metrics.fid || 0, { good: 100, poor: 300 })}`}>
                    {metrics.fid ? `${Math.round(metrics.fid)}ms` : '--'}
                  </div>
                </div>

                <div className="text-center p-2 bg-surface/50 rounded">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Activity className="h-3 w-3" />
                    <span className="text-xs font-medium">CLS</span>
                  </div>
                  <div className={`text-lg font-bold font-mono ${getScoreColor((metrics.cls || 0) * 1000, { good: 100, poor: 250 })}`}>
                    {metrics.cls ? metrics.cls.toFixed(3) : '--'}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-primary/10">
                <div className="text-xs text-foreground/60 space-y-1">
                  <div>Reduced Motion: {typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'Enabled' : 'Disabled'}</div>
                  <div>Device Memory: {typeof navigator !== 'undefined' && (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory}GB` : 'Unknown'}</div>
                  <div>Connection: {typeof navigator !== 'undefined' && (navigator as any).connection?.effectiveType || 'Unknown'}</div>
                </div>
              </div>
            </>
          )}

          <div className="text-xs text-foreground/50 text-center pt-2 border-t border-primary/10">
            Press 'P' to toggle details
          </div>
        </CardContent>
      </Card>
    </div>
  );
}