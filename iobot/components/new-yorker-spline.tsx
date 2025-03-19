"use client"

import type React from "react"
import { SplineScene } from "@/components/ui/splite"
import { Spotlight } from "@/components/ui/spotlight"
import { VectorBackground } from "./vector-background"
import { useState } from "react"

export function NewYorkerSpline() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  return (
    <div className="h-screen w-full bg-black relative overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Vector Background */}
      <VectorBackground />

      {/* Main content - Single frame with two robots */}
      <div className="relative h-full w-full">
        {/* Container for both robots */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {/* Left Robot Door Frame */}
          <div className="absolute left-1/4 bottom-0 -translate-x-1/2 w-[40%] h-[80%] border-2 border-blue-500/30 bg-black/40 rounded-t-lg overflow-hidden">
            {/* Door header */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-blue-900/50 border-b border-blue-500/30 flex items-center px-3">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="absolute top-1 left-0 right-0 flex justify-center">
                <span className="text-xs text-blue-200">Robot A</span>
              </div>
            </div>

            {/* Left Robot */}
            <div className="absolute inset-0 pt-8">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>

            {/* Spotlight - reduced to 25% size */}
            <Spotlight className="left-1/2 top-1/2" size={100} fill="rgba(100, 200, 255, 0.2)" />
          </div>

          {/* Right Robot Door Frame */}
          <div className="absolute left-3/4 bottom-0 -translate-x-1/2 w-[40%] h-[80%] border-2 border-blue-500/30 bg-black/40 rounded-t-lg overflow-hidden">
            {/* Door header */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-blue-900/50 border-b border-blue-500/30 flex items-center px-3">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="absolute top-1 left-0 right-0 flex justify-center">
                <span className="text-xs text-blue-200">Robot B</span>
              </div>
            </div>

            {/* Right Robot */}
            <div className="absolute inset-0 pt-8">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>

            {/* Spotlight - reduced to 25% size */}
            <Spotlight className="left-1/2 top-1/2" size={100} fill="rgba(100, 200, 255, 0.2)" />
          </div>
        </div>
      </div>

      {/* Mouse cursor spotlight - reduced to 25% size */}
      <div
        className="absolute pointer-events-none z-30 rounded-full bg-blue-400/10 blur-xl"
        style={{
          width: "100px",
          height: "100px",
          left: `${mousePosition.x - 50}px`,
          top: `${mousePosition.y - 50}px`,
          transition: "transform 0.1s ease-out",
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(0,0,0,0.7) 100%)",
        }}
      />
    </div>
  )
}

