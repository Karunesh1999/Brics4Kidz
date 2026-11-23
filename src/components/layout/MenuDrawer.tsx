import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Home, Compass, Calendar, PartyPopper, Images, Info, PhoneCall, Bot, Sparkles, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '../ui/Button';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAi: () => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  onOpenAi,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNav = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-150">
      <div className="w-80 max-w-[85%] bg-card h-full p-5 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-right duration-200 overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="bg-white px-2 py-1 rounded-lg border border-border shadow-xs flex items-center justify-center">
              <img
                src="/images/b4k-official-logo.svg"
                alt="Bricks 4 Kidz"
                className="h-6 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-title-md text-primary font-bold">Bricks 4 Kidz</span>
              <span className="font-body text-[11px] text-muted-foreground font-medium">Franklin – Nashville</span>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-foreground hover:bg-surface-high transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1 font-headline text-body-md text-foreground flex-1">
          <button
            onClick={() => handleNav('/')}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-low text-left border-b border-border/40"
          >
            <Home size={18} className="text-primary" />
            <span>Home</span>
          </button>

          <button
            onClick={() => handleNav('/about')}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-low text-left border-b border-border/40"
          >
            <Info size={18} className="text-secondary" />
            <span>About Us & Safety</span>
          </button>

          <button
            onClick={() => handleNav('/services')}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-low text-left border-b border-border/40"
          >
            <Compass size={18} className="text-primary" />
            <span>STEAM Programs</span>
          </button>

          <button
            onClick={() => handleNav('/camps')}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-low text-left border-b border-border/40"
          >
            <Calendar size={18} className="text-secondary" />
            <span>Winter & Summer Camps</span>
          </button>

          <button
            onClick={() => handleNav('/parties')}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-low text-left border-b border-border/40"
          >
            <PartyPopper size={18} className="text-destructive" />
            <span>Birthday Parties ($249 & $349)</span>
          </button>

          <button
            onClick={() => handleNav('/gallery')}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-low text-left border-b border-border/40"
          >
            <Images size={18} className="text-primary" />
            <span>Student LEGO® Gallery</span>
          </button>

          <button
            onClick={() => handleNav('/booking')}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-low text-left border-b border-border/40 font-bold text-primary"
          >
            <Sparkles size={18} className="text-accent-foreground" />
            <span>Online Booking & Checkout</span>
          </button>

          <button
            onClick={() => handleNav('/contact')}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-low text-left border-b border-border/40"
          >
            <PhoneCall size={18} className="text-secondary" />
            <span>Contact & Location</span>
          </button>

          <button
            onClick={() => handleNav('/ai-hub')}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-low text-left border-b border-border/40"
          >
            <Bot size={18} className="text-primary" />
            <span>Team AI & Lead Hub</span>
          </button>

          {/* Direct AI trigger */}
          <div className="pt-2">
            <Button
              variant="secondary"
              size="md"
              className="w-full gap-2 justify-start font-bold"
              onClick={() => {
                onClose();
                onOpenAi();
              }}
            >
              <Bot size={18} />
              <span>Ask BrickBot AI</span>
            </Button>
          </div>
        </nav>

        {/* Drawer Footer Details */}
        <div className="pt-3 border-t border-border flex flex-col gap-2 text-body-sm text-muted-foreground shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <MapPin size={14} className="text-destructive shrink-0" />
            <span>215 Gothic Ct #102, Franklin TN</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Phone size={14} className="text-primary shrink-0" />
            <span>(615) 379-8800</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Mail size={14} className="text-secondary shrink-0" />
            <span>franklin@bricks4kidz.com</span>
          </div>
        </div>

      </div>
    </div>
  );
};
