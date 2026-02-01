import { User, MapPin, ShoppingCart } from 'lucide-react';
import FloatingMenu from './menuHover';

export function Header() {

  const hoverColor = "hover:text-[#0066b1] cursor-pointer transition-colors duration-300 ease-in-out ";
  
  return (
    <header
      id="header"
      className="fixed top-0 left-0 w-full z-50 pointer-events-none"
    >

      {/* CONTAINER ANIMADO */}
      <div
        id="header-motion"
        className="pointer-events-auto flex justify-between items-center px-10 py-4 w-full"
      >

        {/* LOGO */}
        <div className="logo">
          <img className='w-15' src="/bmw-svg-logo.svg" alt="bmwLogo" />
        </div>

        {/* GLASS */}
        <div className="relative mx-auto w-fit">
          {/* blur layer */}
          <div
            className="
              absolute inset-0
              backdrop-blur-sm
              bg-white/10
              border border-white/10
              rounded-full
              shadow-[0_4px_30px_rgba(0,0,0,0.15)]
              will-change-transform
            "
          />

          {/* conteúdo */}
          <div className="relative flex gap-6 px-6 py-4">
            <a href='/models' className={hoverColor}>Models</a>
            <a href='/customize' className={hoverColor}>Customize your BMW</a>
            <a href='/services' className={hoverColor}>BMW Services</a>
            <FloatingMenu />
          </div>
        </div>

        <div className="userOptions flex gap-4 flex-row space-x-6">
          <a href="" className={hoverColor}><User /></a>
          <a href="" className={hoverColor}><MapPin /></a>
          <a href="" className={hoverColor}><ShoppingCart /></a>
        </div>
      </div>
    </header>
  )
}