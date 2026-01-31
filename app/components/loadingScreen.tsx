'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface Props {
  isDone: boolean
  onFinish: () => void
}

export default function LoadingScreen({ isDone, onFinish }: Props) {
  const loadingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isDone || !loadingRef.current) return

    // animação de saída (sobe e some)
    gsap.to(loadingRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: 'power4.inOut',
      onComplete: onFinish,
    })
  }, [isDone, onFinish])

  return (
    <div
      ref={loadingRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white rounded-b-4xl"
    >
      <h1 className="text-4xl font-bold tracking-widest">
        LOADING
      </h1>
    </div>
  )
}
