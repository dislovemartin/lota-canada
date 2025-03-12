import { ImageResponse } from "next/og"
import React from "react"

// Route segment config
export const runtime = "edge"

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"

// Image generation
export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "black",
          fontWeight: "bold",
          borderRadius: "50%",
          border: "2px solid black",
        }}
      >
        L
      </div>
    ),
    {
      width: 32,
      height: 32,
    }
  )
}

