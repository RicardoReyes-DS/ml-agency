"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, Play, Settings, RotateCcw, Share2, ExternalLink } from "lucide-react";
import { MLDemo, DemoConfig } from "@/lib/types";
import { usePrefersReducedMotion } from "@/hooks/use-performance";
import Link from "next/link";
import { formatLocalizedCopy, getDictionary, localizeHref, type Locale } from "@/lib/i18n";

interface DemoWrapperProps {
  demo: MLDemo;
  children: React.ReactNode;
  locale?: Locale;
}

export function DemoWrapper({ demo, children, locale = "en" }: DemoWrapperProps) {
  const [config, setConfig] = useState<DemoConfig>({
    loading: false,
    error: null,
    data: null,
  });

  const [parameters, setParameters] = useState<Record<string, number | string>>({
    confidence: 0.8,
    batchSize: 32,
    modelVersion: "latest",
  });

  const [metrics, setMetrics] = useState({
    responseTime: null as number | null,
    accuracy: null as number | null,
    memoryUsage: null as number | null,
  });

  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const copy = getDictionary(locale).demoWrapper;

  const handleDemoRun = useCallback(async () => {
    setConfig(prev => ({ ...prev, loading: true, error: null }));
    const startTime = performance.now();

    try {
      // Enhanced mock API call with parameters
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

      const responseTime = performance.now() - startTime;
      const accuracy = 0.85 + Math.random() * 0.15; // Mock accuracy between 85-100%
      const memoryUsage = Math.floor(Math.random() * 50) + 20; // Mock memory usage

      setMetrics({
        responseTime: Math.round(responseTime),
        accuracy: Math.round(accuracy * 100) / 100,
        memoryUsage,
      });

      setConfig(prev => ({
        ...prev,
        loading: false,
        data: {
          result: formatLocalizedCopy(copy.result, { accuracy: Math.round(accuracy * 100) }),
          parameters,
          metrics: { responseTime, accuracy, memoryUsage }
        }
      }));
    } catch (error) {
      setConfig(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : copy.errorFallback
      }));
    }
  }, [copy.errorFallback, copy.result, parameters]);

  const handleParameterChange = (key: string, value: number | string) => {
    setParameters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setConfig({ loading: false, error: null, data: null });
    setMetrics({ responseTime: null, accuracy: null, memoryUsage: null });
    setParameters({
      confidence: 0.8,
      batchSize: 32,
      modelVersion: "latest"
    });
  };

  return (
    <Card className="w-full group">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Play className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                {demo.title}
              </CardTitle>
              <CardDescription className="mt-2">{demo.description}</CardDescription>
            </div>
            <div className="flex gap-2 ml-4">
              <Link href={localizeHref(locale, `/demos/${demo.category === 'computer-vision' ? 'computer-vision' : demo.category === 'nlp' ? 'nlp' : demo.category === 'deep-learning' ? 'deep-learning' : 'predictive-analytics'}`)}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2"
                  title={copy.detailTitle}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAdvancedMode(!isAdvancedMode)}
                className="p-2"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {demo.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full font-mono hover:bg-accent/20 transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Advanced Parameters */}
        {isAdvancedMode && (
          <div className="p-4 bg-surface/50 rounded-lg border border-primary/10 space-y-3">
            <h4 className="text-sm font-semibold text-foreground">{copy.parameters}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-medium text-foreground/70">{copy.confidence}</label>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.1"
                  value={parameters.confidence}
                  onChange={(e) => handleParameterChange('confidence', parseFloat(e.target.value))}
                  className="w-full mt-1"
                />
                <span className="text-xs text-accent font-mono">{parameters.confidence}</span>
              </div>
              <div>
                <label className="text-xs font-medium text-foreground/70">{copy.batchSize}</label>
                <select
                  value={parameters.batchSize}
                  onChange={(e) => handleParameterChange('batchSize', parseInt(e.target.value))}
                  className="w-full mt-1 px-2 py-1 text-sm bg-surface border border-primary/20 rounded"
                >
                  <option value={16}>16</option>
                  <option value={32}>32</option>
                  <option value={64}>64</option>
                  <option value={128}>128</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-foreground/70">{copy.modelVersion}</label>
                <select
                  value={parameters.modelVersion}
                  onChange={(e) => handleParameterChange('modelVersion', e.target.value)}
                  className="w-full mt-1 px-2 py-1 text-sm bg-surface border border-primary/20 rounded"
                >
                  <option value="latest">Latest</option>
                  <option value="v2.1">v2.1</option>
                  <option value="v2.0">v2.0</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleDemoRun}
            disabled={config.loading}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            {config.loading ? (
              <>
                <Loader2 className={`mr-2 h-4 w-4 ${prefersReducedMotion ? '' : 'animate-spin'}`} />
                {copy.computing}
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                {copy.runDemo}
              </>
            )}
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              disabled={config.loading}
              className="px-3"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="px-3"
              onClick={() => navigator.share?.({
                title: `${demo.title} - ML Agency Demo`,
                text: demo.description,
                url: window.location.href,
              })}
              title={copy.shareTitle}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Performance Metrics */}
        {metrics.responseTime && (
          <div className="grid grid-cols-3 gap-4 p-3 bg-surface/50 rounded-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-accent font-mono">{metrics.responseTime}ms</div>
              <div className="text-xs text-foreground/70">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-accent font-mono">{metrics.accuracy}</div>
              <div className="text-xs text-foreground/70">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-accent font-mono">{metrics.memoryUsage}MB</div>
              <div className="text-xs text-foreground/70">Memory</div>
            </div>
          </div>
        )}

        {/* Error State */}
        {config.error && (
          <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
            <span className="text-sm text-destructive">{config.error}</span>
          </div>
        )}

        {/* Loading State */}
        {config.loading && (
          <div className="space-y-3 p-4 bg-surface/50 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <span className="text-sm text-foreground/70 ml-2">Processing...</span>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-surface animate-pulse rounded w-full"></div>
              <div className="h-2 bg-surface animate-pulse rounded w-3/4"></div>
              <div className="h-2 bg-surface animate-pulse rounded w-1/2"></div>
            </div>
          </div>
        )}

        {/* Results */}
        {config.data && !config.loading && (
          <div className="p-4 bg-surface rounded-md border border-primary/10">
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
