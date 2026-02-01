'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

export function useBmwScrollAnimation(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  onLoaded?: () => void
) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let destroyed = false

    /* -------------------- LENIS -------------------- */
    const lenis = new Lenis()
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    /* -------------------- CANVAS SIZE -------------------- */
    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    setCanvasSize()

    /* -------------------- FRAMES -------------------- */
    const frameCount = 429
    const getFrameSrc = (i: number) =>
      `/selected-frames/frame_${String(i).padStart(5, '0')}.webp`

    const state = { frame: 0 }

    let currentBitmap: ImageBitmap | null = null
    let previousBitmap: ImageBitmap | null = null
    let loading = false

    /* -------------------- LOAD FRAME -------------------- */
    const loadFrame = async (index: number) => {
      if (destroyed || loading) return
      if (index < 0 || index >= frameCount) return

      loading = true

      try {
        const res = await fetch(getFrameSrc(index))
        const blob = await res.blob()
        const bitmap = await createImageBitmap(blob)

        if (destroyed) {
          bitmap.close()
          return
        }

        previousBitmap?.close()
        previousBitmap = currentBitmap
        currentBitmap = bitmap

        render()
      } catch {
        console.warn('Erro ao carregar frame', index)
      } finally {
        loading = false
      }
    }

    /* -------------------- RENDER -------------------- */
    const render = () => {
      const img = currentBitmap || previousBitmap
      if (!img) return

      const cw = window.innerWidth
      const ch = window.innerHeight

      ctx.clearRect(0, 0, cw, ch)

      const imgAspect = img.width / img.height
      const canvasAspect = cw / ch

      let w, h, x, y

      if (imgAspect > canvasAspect) {
        h = ch
        w = h * imgAspect
        x = (cw - w) / 2
        y = 0
      } else {
        w = cw
        h = w / imgAspect
        x = 0
        y = (ch - h) / 2
      }

      ctx.drawImage(img, x, y, w, h)
    }

    /* -------------------- INIT -------------------- */
    loadFrame(0).then(() => {
      if (destroyed) return

      ScrollTrigger.create({
        trigger: canvas,
        start: 'top top',
        end: `+=${frameCount * 10 + 1000}`,
        pin: true,
        scrub: true,

        onUpdate(self) {
          const progress = gsap.utils.clamp(0, 1, self.progress)
          const frame = Math.min(
            frameCount - 1,
            Math.floor(progress * frameCount)
          )

          if (frame !== state.frame) {
            state.frame = frame
            loadFrame(frame)
          }
        },
      })

      ScrollTrigger.refresh()
      onLoaded?.()
    })

    /* -------------------- RESIZE -------------------- */
    const onResize = () => {
      setCanvasSize()
      render()
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', onResize)

    /* -------------------- CLEANUP -------------------- */
    return () => {
      destroyed = true

      lenis.destroy()
      ScrollTrigger.getAll().forEach(t => t.kill())
      gsap.killTweensOf(canvas)

      window.removeEventListener('resize', onResize)

      currentBitmap?.close()
      previousBitmap?.close()
    }
  }, [canvasRef, onLoaded])
}
