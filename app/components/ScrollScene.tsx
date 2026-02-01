'use client'

import { useBmwScrollAnimation } from '../hooks/useBmwScrollAnimation'

interface ScrollSceneProps {
  onLoaded: () => void
}

export default function ScrollScene({ onLoaded }: ScrollSceneProps) {
  useBmwScrollAnimation(onLoaded)

  return (
    <section
      id="scroll-section"
      className="relative h-[800vh] w-full overflow-hidden"
    >
      <canvas className="fixed inset-0 w-full h-full" />

      <header className="absolute top-1/2 left-1/2 z-10">
      </header>

      
    </section>
  )
}
