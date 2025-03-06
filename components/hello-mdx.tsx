'use client'

// import { Slider } from "@heroui/react";
import { useState } from 'react'

export default function HelloMDX() {
  const [opacity, setOpacity] = useState(0)

  return (
    <div className="relative overflow-hidden rounded-xl p-6">
      <div
        className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500"
        style={{
          opacity: 1 - opacity,
        }}
      />
      <div className="relative">
        <h3 className="mb-3 text-xl font-bold text-white">Hello MDX</h3>
        <p className="text-sm text-white/90">
          This is a card component rendered from MDX with interactive components.
        </p>
        <div className="mt-6">
          <input
            id="opacity-range"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={opacity}
            className="max-w-auto h-2"
            onChange={(event) => setOpacity(Number(event.target.value))}
          />
        </div>
      </div>
    </div>
  )
}
