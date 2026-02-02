'use client'

import { useRef } from 'react'
import { useBmwScrollAnimation } from '../hooks/useBmwScrollAnimation'
import { Topics } from './topics'

export default function ScrollScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useBmwScrollAnimation(canvasRef)

  return (
    <section
      id="scroll-section"
      className="relative h-[800vh] w-full overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-0"
      />

      <Topics />

    </section>
  )
}
