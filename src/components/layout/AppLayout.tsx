import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { BrickBotModal } from '../BrickBotModal';
import { StripeModal } from '../StripeModal';
import { Bot } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const [isAiOpen, setIsAiOpen] = useState(false);

  // Global Stripe modal state
  const [stripeItem, setStripeItem] = useState<{
    title: string;
    price: string;
    subtitle?: string;
  } | null>(null);

  const location = useLocation();

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const handleOpenStripe = (item: { title: string; price: string; subtitle?: string }) => {
    setStripeItem(item);
  };

  return (
    <div className="w-full min-h-screen bg-background flex flex-col relative pb-20">
      {/* Top Mobile Header */}
      <Header />

      {/* Main Routed Content */}
      <main className="flex-1 px-page-margin">
        <Outlet context={{ onOpenStripe: handleOpenStripe, onOpenAi: () => setIsAiOpen(true) }} />
      </main>

      {/* Floating BrickBot AI Pill */}
      <div className="fixed bottom-20 right-4 z-30 transition-all">
        <button
          onClick={() => setIsAiOpen(true)}
          aria-label="Open BrickBot AI Concierge"
          className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-secondary text-secondary-foreground font-headline font-bold shadow-xl hover:opacity-95 active:scale-95 transition-all border border-card/30"
        >
          <Bot size={20} />
          <span className="text-label-lg font-bold">Ask BrickBot</span>
        </button>
      </div>

      {/* Sticky Mobile Bottom Navigation */}
      <BottomNav />

      {/* BrickBot AI Drawer Modal */}
      <BrickBotModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        onOpenStripe={handleOpenStripe}
      />

      {/* Global Stripe Checkout Simulator */}
      <StripeModal
        isOpen={!!stripeItem}
        onClose={() => setStripeItem(null)}
        bookingItem={stripeItem}
      />
    </div>
  );
};
