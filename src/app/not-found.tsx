import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileQuestion, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <FileQuestion className="h-16 w-16 text-primary" aria-hidden />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Page not found</h1>
        <p className="text-foreground-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className={cn(buttonVariants(), "min-h-[44px] min-w-[44px]")}
        >
          <Home className="h-4 w-4 mr-2 inline" aria-hidden />
          Back to home
        </Link>
      </div>
    </div>
  );
}
