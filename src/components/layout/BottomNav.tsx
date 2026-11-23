import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CalendarDays, Blocks, PartyPopper, LayoutGrid } from 'lucide-react';

export interface BottomNavProps {
  onOpenMenu?: () => void;
  isMenuOpen?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = () => {
  return (
    <nav
      aria-label="Primary Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.06)] w-full max-w-[430px] mx-auto px-2 pt-1.5 pb-2.5"
    >
      <div className="grid grid-cols-5 items-end justify-items-center relative">

        {/* 1. Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 transition-all ${isActive
              ? 'bg-[#EBF3FC] text-primary px-3 py-1 rounded-2xl shadow-xs'
              : 'text-slate-500 hover:text-slate-800 py-1 px-2'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Home size={20} className={isActive ? 'stroke-[2.3]' : 'stroke-[1.8]'} />
              <span className={`text-[11px] leading-tight ${isActive ? 'font-bold text-primary' : 'font-medium'}`}>
                Home
              </span>
            </>
          )}
        </NavLink>

        {/* 2. Camps */}
        <NavLink
          to="/camps"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 transition-all ${isActive
              ? 'bg-[#EBF3FC] text-primary px-3 py-1 rounded-2xl shadow-xs'
              : 'text-slate-500 hover:text-slate-800 py-1 px-2'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <CalendarDays size={20} className={isActive ? 'stroke-[2.3]' : 'stroke-[1.8]'} />
              <span className={`text-[11px] leading-tight ${isActive ? 'font-bold text-primary' : 'font-medium'}`}>
                Camps
              </span>
            </>
          )}
        </NavLink>

        {/* 3. Center Elevated FAB: Programs */}
        <NavLink
          to="/services"
          className="flex flex-col items-center -mt-6 group focus:outline-none"
        >
          {({ isActive }) => (
            <>
              <div
                className={`rounded-full flex items-center justify-center bg-primary text-white shadow-lg border-[3.5px] border-white transition-all duration-200 group-active:scale-95 group-hover:scale-105 ${isActive ? 'ring-2 ring-primary/40 ring-offset-1' : ''
                  }`}
                style={{ width: '50px', height: '50px' }}
              >
                <Blocks size={24} className="text-white stroke-[2]" />
              </div>
              <span
                className={`text-[11px] mt-0.5 leading-tight transition-colors ${isActive ? 'text-primary font-bold' : 'text-slate-600 font-medium'
                  }`}
              >
                Programs
              </span>
            </>
          )}
        </NavLink>

        {/* 4. Parties */}
        <NavLink
          to="/parties"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 transition-all ${isActive
              ? 'bg-[#EBF3FC] text-primary px-3 py-1 rounded-2xl shadow-xs'
              : 'text-slate-500 hover:text-slate-800 py-1 px-2'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <PartyPopper size={20} className={isActive ? 'stroke-[2.3]' : 'stroke-[1.8]'} />
              <span className={`text-[11px] leading-tight ${isActive ? 'font-bold text-primary' : 'font-medium'}`}>
                Parties
              </span>
            </>
          )}
        </NavLink>

        {/* 5. More (Dedicated Page) */}
        <NavLink
          to="/more"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 transition-all ${
              isActive
                ? 'bg-[#EBF3FC] text-primary px-3 py-1 rounded-2xl shadow-xs'
                : 'text-slate-500 hover:text-slate-800 py-1 px-2'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <LayoutGrid size={20} className={isActive ? 'stroke-[2.3]' : 'stroke-[1.8]'} />
              <span className={`text-[11px] leading-tight ${isActive ? 'font-bold text-primary' : 'font-medium'}`}>
                More
              </span>
            </>
          )}
        </NavLink>

      </div>
    </nav>
  );
};
