"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    let x = 0;
    let y = 0;
    let followX = 0;
    let followY = 0;
    const friction = 1 / 30;

    const animate = () => {
      x += (followX - x) * friction;
      y += (followY - y) * friction;

      if (imgRef.current) {
        imgRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
      }

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = Math.max(
        -100,
        Math.min(100, window.innerWidth / 2 - e.clientX)
      );
      const mouseY = Math.max(
        -100,
        Math.min(100, window.innerHeight / 2 - e.clientY)
      );

      followX = (20 * mouseX) / 100;
      followY = (10 * mouseY) / 100;
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0d0c1e] font-roboto text-[#cdd4de]">

      {/* Conteúdo */}
      <div className="relative z-10 w-full max-w-5xl px-4 text-center pt-[5vh]">
        <h1 className="font-black opacity-60 text-[clamp(6rem,15vw,10rem)]">
          404
        </h1>

        <h2 className="mt-2 opacity-90 text-[clamp(1.5rem,4vw,2.2rem)]">
          Página não encontrada
        </h2>

        <p className="mx-auto mt-3 max-w-xl opacity-70 text-[clamp(0.9rem,2vw,1rem)]">
          Tentamos encontrar o que você procura, mas não deu certo.
        </p>

        <Link
          href="/"
          className="mt-[5vh] inline-block rounded border border-[#cdd4de] px-5 py-2 text-xs uppercase tracking-wide opacity-50 transition-opacity hover:opacity-100"
        >
          Voltar para a home
        </Link>
      </div>

      {/* Background */}
      <img
        ref={imgRef}
        src="/404-bg.jpg"
        alt="Background"
        className="absolute inset-0 -z-0 h-full w-full object-cover scale-110"
      />
    </main>
  );
}
