'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

export function useBmwScrollAnimation(onLoaded?: () => void) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    /* -------------------- LENIS -------------------- */
    const lenis = new Lenis()
    lenis.on('scroll', () => ScrollTrigger.update())

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    /* -------------------- ELEMENTOS -------------------- */
    const heroImg = document.querySelector('.hero-img') as HTMLElement | null
    const canvas = document.querySelector('canvas') as HTMLCanvasElement | null
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    /* -------------------- CANVAS SIZE -------------------- */
    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25) // 🔥 LIMITADO
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

    /* -------------------- BITMAPS (MEMÓRIA CONTROLADA) -------------------- */
    let currentBitmap: ImageBitmap | null = null
    let previousBitmap: ImageBitmap | null = null
    let loading = false

    /* -------------------- LOAD FRAME (1 BITMAP ATIVO) -------------------- */
    const loadFrame = async (index: number) => {
      if (index < 0 || index >= frameCount) return
      if (loading) return

      loading = true

      try {
        const res = await fetch(getFrameSrc(index))
        const blob = await res.blob()
        const bitmap = await createImageBitmap(blob)

        // libera o anterior
        if (previousBitmap) previousBitmap.close()
        previousBitmap = currentBitmap

        currentBitmap = bitmap
        render()
      } catch (e) {
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
    state.frame = 0

    loadFrame(0).then(() => {
      requestAnimationFrame(() => {
        render()

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

            if (heroImg) {
              gsap.set(heroImg, {
                opacity: progress >= 0.6 ? 0 : 1,
              })
            }
          },
        })

        ScrollTrigger.refresh(true)
        onLoaded?.()
      })
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
      lenis.destroy()
      ScrollTrigger.killAll()
      window.removeEventListener('resize', onResize)

      if (currentBitmap) currentBitmap.close()
      if (previousBitmap) previousBitmap.close()
    }
  }, [])
}
