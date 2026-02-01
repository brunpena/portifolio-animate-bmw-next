'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Loading() {
  const loadingRef = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const counter = useRef({ value: 0 })

  useEffect(() => {
    if (!numberRef.current || !loadingRef.current) return

    gsap.to(counter.current, {
      value: 99,
      duration: 3,
      ease: 'power1.out',
      onUpdate: () => {
        numberRef.current!.textContent = Math.floor(
          counter.current.value
        )
          .toString()
          .padStart(2, '0')
      },
    })

    return () => {
      gsap.killTweensOf(counter.current)
      gsap.killTweensOf(loadingRef.current)
    }
  }, [])

  return (
    <div
      ref={loadingRef}
      className="fixed inset-0 z-[9999] flex items-end bg-black text-white"
    >
      <span
        ref={numberRef}
        className="text-[15rem] font-bold tracking-tight leading-none p-12 text-[#171717]"
      >
        00
      </span>
    </div>
  )
}
