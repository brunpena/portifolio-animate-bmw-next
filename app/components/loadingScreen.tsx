'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface Props {
  isDone: boolean
  onFinish: () => void
}

export default function LoadingScreen({ isDone, onFinish }: Props) {
  const loadingRef = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)

  const counter = useRef({ value: 0 })

  // anima de 0 → 99 e PARA
  useEffect(() => {
    if (!numberRef.current) return

    gsap.to(counter.current, {
      value: 99,
      duration: 3,
      ease: 'power1.out',
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.textContent = Math.floor(
            counter.current.value
          )
            .toString()
            .padStart(2, '0')
        }
      },
    })

    return () => {
      gsap.killTweensOf(counter.current)
    }
  }, [])

  // quando terminar o preload
  useEffect(() => {
    if (!isDone || !loadingRef.current || !numberRef.current) return

    // 🔒 mata QUALQUER animação do contador
    gsap.killTweensOf(counter.current)

    // 🔥 trava definitivamente em 100
    numberRef.current.textContent = '100'

    // animação de saída
    gsap.to(loadingRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: 'power4.inOut',
      delay: 0.2,
      onComplete: onFinish,
    })
  }, [isDone, onFinish])

  return (
    <div
      ref={loadingRef}
      className="fixed inset-0 z-[9999] flex flex-col items-start justify-end bg-black text-white "
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
