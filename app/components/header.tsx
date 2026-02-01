import { User } from 'lucide-react';

export function Header() {
  return (
    <header id="header" className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 px-15">
      <div className="routes flex gap-4 flex-row space-x-6"> 
        <span>Aopa</span>
        <span>Vmooo</span>
        <span>Ai papai</span>
      </div>
      
      <div className="logo">
        <img src="/bmw-svg-logo.svg" alt="bmwLogo" />
      </div>

      <div className="userOptions flex gap-4 flex-row space-x-6">
        <a href="">user</a>
        <a href="">local</a>
        <a href="">shop</a>
      </div>
    </header>
  )
}