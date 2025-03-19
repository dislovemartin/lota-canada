"use client"

interface DoorFrameProps {
  position: "left" | "right"
  className?: string
}

export function DoorFrame({ position, className }: DoorFrameProps) {
  const isLeft = position === "left"

  return (
    <div className={`relative ${className}`}>
      {/* Door frame */}
      <div className="absolute inset-0 border-2 border-zinc-700 bg-black/80 rounded-md overflow-hidden">
        {/* Door header */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-zinc-800 border-b border-zinc-700 flex items-center px-3">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <div className="absolute top-1 left-0 right-0 flex justify-center">
            <span className="text-xs text-zinc-400">Robot {isLeft ? "A" : "B"}</span>
          </div>
        </div>

        {/* Door hinges */}
        <div className={`absolute top-1/4 ${isLeft ? "left-0" : "right-0"} w-2 h-8 bg-zinc-600 rounded-sm`}></div>
        <div className={`absolute top-3/4 ${isLeft ? "left-0" : "right-0"} w-2 h-8 bg-zinc-600 rounded-sm`}></div>

        {/* Door shadow */}
        <div
          className={`absolute inset-y-0 ${isLeft ? "left-0" : "right-0"} w-8 bg-gradient-to-r ${
            isLeft ? "from-black/50 to-transparent" : "from-transparent to-black/50"
          }`}
        ></div>

        {/* Floor shadow */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/50 to-transparent"></div>

        {/* Status indicator */}
        <div className="absolute bottom-3 right-3 flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
          <span className="text-xs text-green-400">Active</span>
        </div>
      </div>
    </div>
  )
}

