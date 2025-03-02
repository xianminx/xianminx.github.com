'use client'

// import { Slider } from "@heroui/react";
import { useState } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

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
          <Slider
            step={0.01}
            max={1}
            min={0}
            defaultValue={0}
            className="max-w-md"
            onChange={(value) => setOpacity(Array.isArray(value) ? value[0] : value)}
          />
        </div>
      </div>
    </div>
  )
}
