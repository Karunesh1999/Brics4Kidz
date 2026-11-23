import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Calendar } from 'lucide-react';

interface HeaderProps {
  onOpenMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMenu }) => {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    if (onOpenMenu) {
      onOpenMenu();
    } else {
      navigate('/more');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100/90 px-4 py-2.5 flex items-center justify-between gap-3 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all">
      {/* Official Website Brand Logo */}
      <Link 
        to="/" 
        className="flex items-center focus-visible:outline-none group py-0.5"
        aria-label="Bricks 4 Kidz Franklin Home"
      >
        <img
          src="/images/b4k-official-logo.svg"
          alt="Bricks 4 Kidz Official Logo"
          className="h-9 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
        />
      </Link>

      {/* Action Controls */}
      <div className="flex items-center gap-2">
        {/* Quick Enroll CTA Pill */}
        <button
          onClick={() => navigate('/booking')}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-sm transition-all active:scale-95"
        >
          <Calendar size={13} className="text-white" />
          <span>Enroll</span>
        </button>

        {/* Menu Navigation Button -> Navigates to /more */}
        <button
          onClick={handleMenuClick}
          aria-label="Open More navigation page"
          className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-all active:scale-95"
        >
          <Menu size={19} />
        </button>
      </div>
    </header>
  );
};
