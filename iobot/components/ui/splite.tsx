"use client";

import { cn } from "@/lib/utils";
import { Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <div className={cn("relative w-full h-full", className)}>
      <Suspense
        fallback={<div className="w-full h-full bg-muted animate-pulse" />}
      >
        <Spline scene={scene} />
      </Suspense>
    </div>
  );
}
