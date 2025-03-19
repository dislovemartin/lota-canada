"use client";

import { Application } from "@splinetool/runtime";
import { useEffect, useRef } from "react";

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className = "" }: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const app = new Application(canvasRef.current);
    app.load(scene);

    return () => {
      app.dispose();
    };
  }, [scene]);

  return <canvas ref={canvasRef} className={className} />;
}
