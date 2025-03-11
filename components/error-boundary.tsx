import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from "react-error-boundary";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallbackRender?: (props: FallbackProps) => React.ReactNode;
}

function DefaultFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  useEffect(() => {
    // Log the error to analytics
    trackEvent("error_boundary_triggered", {
      category: "error",
      label: error.message,
    });
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
      <div className="rounded-full bg-destructive/10 p-4 mb-4">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        We apologize for the inconvenience. The error has been logged and we'll
        work to fix it as soon as possible.
      </p>
      <div className="flex gap-4">
        <Button onClick={resetErrorBoundary}>Try again</Button>
        <Button
          variant="outline"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Go to homepage
        </Button>
      </div>
      {process.env.NODE_ENV === "development" && (
        <div className="mt-8 p-4 bg-muted rounded-md text-left overflow-auto max-w-full">
          <p className="font-mono text-sm mb-2 text-destructive">
            {error.name}: {error.message}
          </p>
          <pre className="text-xs overflow-auto max-h-[200px]">
            {error.stack}
          </pre>
        </div>
      )}
    </div>
  );
}

export function ErrorBoundary({
  children,
  fallbackRender,
}: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      fallbackRender={fallbackRender || DefaultFallback}
      onError={(error) => {
        // Log the error to analytics
        trackEvent("error_boundary_triggered", {
          category: "error",
          label: error.message,
        });
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
