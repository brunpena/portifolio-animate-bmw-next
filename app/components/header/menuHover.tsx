'use client'

import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

type MenuItem = {
  label: string
  content: React.ReactNode
}

const menuItems: MenuItem[] = [
  {
    label: 'Discover Us',
    content: (
      <div className=" flex row justify-between items-center p-6 text-white w-full h-full">

        <div className='relative w-[40%] h-full border border-black/10 rounded-2xl overflow-hidden bg-gray-400/30 backdrop-blur-sm shadow-lg'>
          <img
            src="/selected-frames/frame_00001.webp"
            alt="BMW Car"
            className="w-full h-full object-cover brightness-90 hover:scale-105 transition-transform duration-500 z-30"
          />
          <h1 className="absolute bottom-8 left-10 text-xl font-bold text-gray-400/50 z-40">
            Bmw Corporation
          </h1>
          <p className="absolute bottom-4 left-8 text-center text-sm text-gray-400/50 z-40">Where power meets strength</p>
        </div>

        <div className='buttons flex flex-col justify-between w-[57%] h-full overflow-hidden space-y-[2%] '>

          <Link
            href="/about-us"
            className="flex w-full h-[30%] bg-[#ffeeff]/60 border border-black/30 rounded-2xl
                      hover:bg-[#c1c0c1] transition cursor-pointer"
          >
            <div className="flex px-7 py-2 justify-center flex-col items-start w-full h-full">
              <h2 className="text-lg font-semibold text-black/70">
                About Us
              </h2>
              <p className="text-sm text-black/50">
                Learn more about our company and values
              </p>
            </div>
          </Link>

          <Link
            href="/bmw-brazil"
            className="flex w-full h-[30%] bg-[#ffeeff]/60 border border-black/30 rounded-2xl
                      hover:bg-[#c1c0c1] transition cursor-pointer"
          >
            <div className="flex px-7 py-2 justify-center flex-col items-start w-full h-full">
              <h2 className="text-lg font-semibold text-black/70">
                BMW Brazilian Group
              </h2>
              <p className="text-sm text-black/50">
                Explore our presence in Brazil
              </p>
            </div>
          </Link>

          <Link
            href="/culture-events"
            className="flex w-full h-[30%] bg-[#ffeeff]/60 border border-black/30 rounded-2xl
                      hover:bg-[#c1c0c1] transition cursor-pointer"
          >
            <div className="flex px-7 py-2 justify-center flex-col items-start w-full h-full">
              <h2 className="text-lg font-semibold text-black/70">
                Culture & Events
              </h2>
              <p className="text-sm text-black/50">
                Discover our cultural initiatives and events
              </p>
            </div>
          </Link>

        </div>
      </div>
    ),
  },
]

export default function FloatingMenu() {
  return (
    <div className="relative">
      <ul className="flex gap-10">
        {menuItems.map(item => (
          <li key={item.label} className="relative group">
            {/* Label */}
            <span
              className="
                flex items-center gap-1
                cursor-pointer font-medium
                hover:text-[#0066b1]
                transition-colors duration-300
              "
            >
              {item.label}
              <ChevronDown
                size={16}
                className="
                  transition-transform duration-300
                  group-hover:rotate-180
                "
              />
            </span>

            {/* Ponte invisível */}
            <div className="absolute top-full left-0 h-10 w-full" />

            {/* PAINEL EXTERNO (CLIPA AS BORDAS) */}
            <div
              className="
                absolute top-5
                left-1/2 -translate-x-1/2   
                backdrop-blur-[5px]    
                w-[40vw] h-[40vh]
                border border-white/10
                rounded-3xl
                shadow-[0_10px_40px_rgba(0,0,0,0.4)]
                m-6

                opacity-0 pointer-events-none
                -translate-y-3
                transition-all duration-300 ease-out
                group-hover:opacity-100
                group-hover:pointer-events-auto
                group-hover:translate-y-0
              "
            >

              <div
                className="relative z-10 w-full h-full"
              >
                {item.content}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}