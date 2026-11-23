import React, { useState, useEffect, useRef } from 'react';

interface DesktopDeviceFrameProps {
  children: React.ReactNode;
}

const PHONE_WIDTH = 393;
const PHONE_HEIGHT = 852;
const SHELL_PADDING = 12; // p-3 = 12px
const BASE_WIDTH = PHONE_WIDTH + SHELL_PADDING * 2; // 417px
const BASE_HEIGHT = PHONE_HEIGHT + SHELL_PADDING * 2; // 876px

export const DesktopDeviceFrame: React.FC<DesktopDeviceFrameProps> = ({ children }) => {
  // 1. Detect if this window is already nested inside an iframe
  const isInsideIframe = typeof window !== 'undefined' && window.self !== window.top;

  // 2. Detect screen width with a (min-width: 768px) media query
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(min-width: 768px)').matches;
  });

  // 3. Dynamic auto-scaling to fit 100% inside any desktop screen height
  const [scale, setScale] = useState<number>(() => {
    if (typeof window === 'undefined') return 1;
    const availableHeight = window.innerHeight - 36;
    const availableWidth = window.innerWidth - 36;
    return Math.min(1, Math.max(0.3, availableHeight / BASE_HEIGHT, availableWidth / BASE_WIDTH));
  });

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Monitor desktop screen resize and auto-scale to fit 100% of viewport
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(min-width: 768px)');
    
    const handleResize = () => {
      setIsDesktop(mql.matches);
      if (!isInsideIframe && mql.matches) {
        const availableHeight = window.innerHeight - 36;
        const availableWidth = window.innerWidth - 36;
        const scaleH = availableHeight / BASE_HEIGHT;
        const scaleW = availableWidth / BASE_WIDTH;
        const newScale = Math.min(1, scaleH, scaleW);
        setScale(Math.max(0.3, newScale));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    mql.addEventListener('change', handleResize);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
      mql.removeEventListener('change', handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      }
    };
  }, [isInsideIframe]);

  // Bi-directional history synchronization: Desktop browser Back/Forward controls
  useEffect(() => {
    if (isInsideIframe || !isDesktop) return;

    const handlePopState = () => {
      const fullPath = window.location.pathname + window.location.search + window.location.hash;
      if (iframeRef.current && iframeRef.current.contentWindow) {
        try {
          iframeRef.current.contentWindow.location.replace(fullPath);
        } catch {
          iframeRef.current.src = fullPath;
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isInsideIframe, isDesktop]);

  // ON MOBILE (< 768px) OR INSIDE IFRAME: Render children directly with zero wrapper
  if (isInsideIframe || !isDesktop) {
    return <>{children}</>;
  }

  // DESKTOP TOP-LEVEL: 1:1 iPhone Viewport Iframe (393px × 852px)
  const initialPath = (typeof window !== 'undefined')
    ? (window.location.pathname + window.location.search + window.location.hash) || '/'
    : '/';

  const scaledW = Math.round(BASE_WIDTH * scale);
  const scaledH = Math.round(BASE_HEIGHT * scale);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-slate-950 flex items-center justify-center p-3 select-none overflow-hidden z-50">
      
      {/* Dimensionally locked bounding wrapper matching exact scaled size so flexbox centers it perfectly */}
      <div
        className="relative shrink-0 flex items-center justify-center"
        style={{
          width: `${scaledW}px`,
          height: `${scaledH}px`,
        }}
      >
        {/* Outer Titanium Phone Shell with dynamic auto-fit scaling */}
        <div 
          className="relative rounded-[54px] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.1)] ring-1 ring-slate-900/80 transition-transform duration-75 shrink-0"
          style={{
            width: `${BASE_WIDTH}px`,
            height: `${BASE_HEIGHT}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          {/* Inner Phone Screen Container (Exact Standard iPhone Viewport: 393px × 852px) */}
          <div
            className="relative rounded-[42px] overflow-hidden bg-background shadow-inner flex flex-col w-full h-full"
          >
            {/* The Isolated Viewport Iframe */}
            <iframe
              ref={iframeRef}
              src={initialPath}
              title="Bricks 4 Kidz Mobile App Preview"
              className="w-full h-full border-0 select-auto bg-background no-scrollbar"
              style={{
                colorScheme: 'light',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            />
          </div>
        </div>
      </div>

    </div>
  );
};
