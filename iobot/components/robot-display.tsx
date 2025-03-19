"use client";
import { SplineScene } from "@/components/ui/spline";
import Image from "next/image";

interface RobotDisplayProps {
  position: "left" | "right";
}

export default function RobotDisplay({ position }: RobotDisplayProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Fallback robot image */}
      <div className="relative w-[80%] h-[80%] flex items-center justify-center bg-black/5 rounded-xl overflow-hidden backdrop-blur-sm">
        <Image
          src={`/images/robots/robot-${position}.png`}
          alt={`LOTA AI Robot ${position === "left" ? "A" : "B"}`}
          width={300}
          height={400}
          className="object-contain"
          priority
        />

        {/* Try to load Spline scene as well */}
        <div className="absolute inset-0 z-10">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Robot label */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <span className="bg-zinc-900/90 text-white px-3 py-1 rounded-full text-sm font-medium">
          LOTA AI Assistant
        </span>
      </div>
    </div>
  );
}
