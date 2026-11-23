import React, { useState, useEffect, useRef } from 'react';

interface DesktopDeviceFrameProps {
  children: React.ReactNode;
}

export const DesktopDeviceFrame: React.FC<DesktopDeviceFrameProps> = ({ children }) => {
  // 1. Detect if this window is already nested inside an iframe
  const isInsideIframe = typeof window !== 'undefined' && window.self !== window.top;

  // 2. Detect screen width with a (min-width: 768px) media query
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(min-width: 768px)').matches;
  });

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Monitor desktop screen resize
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(min-width: 768px)');
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

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

  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center py-6 px-4 select-none overflow-x-hidden">
      
      {/* Outer Titanium Phone Shell */}
      <div className="relative rounded-[54px] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.1)] ring-1 ring-slate-900/80">
        
        {/* Inner Phone Screen Container (Exact Standard iPhone Viewport: 393px × 852px) */}
        <div
          className="relative rounded-[42px] overflow-hidden bg-background shadow-inner flex flex-col"
          style={{
            width: '393px',
            height: '852px',
          }}
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
  );
};
