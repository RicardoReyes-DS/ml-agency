"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function DemosError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Demo error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <AlertCircle className="h-12 w-12 text-accent" aria-hidden />
        </div>
        <h2 className="text-xl font-bold text-foreground">Demo failed to load</h2>
        <p className="text-foreground-muted text-sm">
          This demo encountered an error. This can happen if WebGL or the ML
          model fails to initialize. Try again or browse other demos.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={reset}
            variant="default"
            className="min-h-[44px] min-w-[44px]"
          >
            <RotateCcw className="h-4 w-4 mr-2 inline" aria-hidden />
            Try again
          </Button>
          <Link
            href="/demos"
            className={cn(buttonVariants({ variant: "outline" }), "min-h-[44px] min-w-[44px]")}
          >
            View all demos
          </Link>
        </div>
      </div>
    </div>
  );
}
