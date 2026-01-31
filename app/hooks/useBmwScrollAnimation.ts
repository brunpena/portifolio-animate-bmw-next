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
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    /* -------------------- ELEMENTOS -------------------- */
    const nav = document.querySelector('nav') as HTMLElement | null
    const header = document.querySelector('header') as HTMLElement | null
    const heroImg = document.querySelector('.hero-img') as HTMLElement | null
    const canvas = document.querySelector('canvas') as HTMLCanvasElement | null

    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    /* -------------------- CANVAS SIZE -------------------- */
    const setCanvasSize = () => {
      const pixelRatio = window.devicePixelRatio || 1

      canvas.width = window.innerWidth * pixelRatio
      canvas.height = window.innerHeight * pixelRatio

      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }

    setCanvasSize()

    /* -------------------- FRAMES -------------------- */
    const frameCount = 695 // frame_00000 até frame_00694

    const currentFrame = (index: number) =>
      `/selected-frames/frame_${String(index).padStart(5, '0')}.jpeg`

    const images: HTMLImageElement[] = []
    const videoFrames = { frame: 0 }
    let imagesToLoad = frameCount

    /* -------------------- RENDER -------------------- */
    const render = () => {
      const img = images[videoFrames.frame]
      if (!img || !img.complete || img.naturalWidth === 0) return

      const canvasWidth = window.innerWidth
      const canvasHeight = window.innerHeight

      context.clearRect(0, 0, canvasWidth, canvasHeight)

      const imageAspect = img.naturalWidth / img.naturalHeight
      const canvasAspect = canvasWidth / canvasHeight

      let drawWidth, drawHeight, drawX, drawY

      if (imageAspect > canvasAspect) {
        drawHeight = canvasHeight
        drawWidth = drawHeight * imageAspect
        drawX = (canvasWidth - drawWidth) / 2
        drawY = 0
      } else {
        drawWidth = canvasWidth
        drawHeight = drawWidth / imageAspect
        drawX = 0
        drawY = (canvasHeight - drawHeight) / 2
      }

      context.drawImage(img, drawX, drawY, drawWidth, drawHeight)
    }

    /* -------------------- SCROLL TRIGGER -------------------- */
    const setupScrollTrigger = () => {
      let lastFrame = -1

      ScrollTrigger.create({
        trigger: canvas,
        start: 'top top',

        // 🔥 espaço extra após o último frame
        end: `+=${frameCount * 10 + 1000}`,

        pin: true,
        scrub: true,

        onUpdate(self) {
          // 🔒 clamp do progresso
          const progress = Math.max(0, Math.min(1, self.progress))

          // 🔒 clamp do frame (NUNCA passa do último)
          const frame = Math.min(
            frameCount - 1,
            Math.floor(progress * frameCount)
          )

          if (frame !== lastFrame) {
            videoFrames.frame = frame
            render()
            lastFrame = frame
          }

          /* -------- NAV -------- */
          if (nav) {
            gsap.set(nav, {
              opacity: progress < 0.1 ? progress / 0.1 : 0,
            })
          }

          /* -------- HEADER -------- */
          if (header && progress >= 0.25) {
            const z = (progress / 0.25) * -500
            const opacity =
              progress > 0.2
                ? 1 - Math.min((progress - 0.2) / 0.05, 1)
                : 1

            gsap.set(header, {
              transform: `translate(-50%, -50%) translateZ(${z}px)`,
              opacity,
            })
          }

          /* -------- HERO IMAGE -------- */
          if (heroImg) {
            gsap.set(heroImg, {
              opacity: progress >= 0.6 ? 0 : 1,
              transform:
                progress >= 0.6
                  ? 'translateZ(1000px)'
                  : 'translateZ(0px)',
            })
          }
        },
      })
    }

    /* -------------------- PRELOAD -------------------- */
    for (let i = 0; i < frameCount; i++) {
      const img = new Image()
      img.src = currentFrame(i)

      img.onload = () => {
        imagesToLoad--
        if (imagesToLoad === 0) {
          render()
          setupScrollTrigger()
          onLoaded?.()
        }
      }

      img.onerror = () => {
        console.warn('Frame não encontrado:', img.src)
        imagesToLoad--
      }

      images.push(img)
    }

    /* -------------------- RESIZE -------------------- */
    window.addEventListener('resize', () => {
      setCanvasSize()
      render()
      ScrollTrigger.refresh()
    })

    /* -------------------- CLEANUP -------------------- */
    return () => {
      lenis.destroy()
      ScrollTrigger.killAll()
    }
  }, [])
}
