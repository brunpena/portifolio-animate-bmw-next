'use client'

export default function ExampleSection() {
  return (
    <section
      id="scroll-section"
      className="relative h-[800vh] bg-black"
    >
      {/* Canvas fixo (visual) */}
      <canvas className="fixed inset-0 w-full h-full z-0" />

      {/* Conteúdo acima do canvas */}
      <div className="relative z-10 h-screen flex items-center justify-center">
        <h1 className="text-white text-5xl font-bold tracking-widest">
          BMW EXPERIENCE
        </h1>
      </div>

      {/* Espaço extra de scroll (opcional visual) */}
      <div className="h-screen flex items-center justify-center text-white">
        Continue rolando
      </div>

      <div className="h-screen flex items-center justify-center text-white">
        Mais scroll
      </div>
    </section>
  )
}
