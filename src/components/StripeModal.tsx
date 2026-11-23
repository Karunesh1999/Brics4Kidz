import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { ArrowLeft, CreditCard, Lock, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StripeModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingItem: {
    title: string;
    price: string;
    subtitle?: string;
  } | null;
  onSuccess?: () => void;
}

export const StripeModal: React.FC<StripeModalProps> = ({
  isOpen,
  onClose,
  bookingItem,
  onSuccess,
}) => {
  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('888');
  const [zip, setZip] = useState('37067');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Synchronize browser history so hardware back button or swipe closes the checkout page
  useEffect(() => {
    if (!isOpen) return;

    window.history.pushState({ stripeCheckout: true }, '');

    const handlePopState = () => {
      setIsCompleted(false);
      onClose();
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !bookingItem) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
      if (onSuccess) onSuccess();
    }, 1200);
  };

  const handleClose = () => {
    setIsCompleted(false);
    if (window.history.state?.stripeCheckout) {
      window.history.back();
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col overflow-y-auto animate-in slide-in-from-right duration-200">
      
      {/* Native Mobile Page Header with Back Icon (No X icon) */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3 shrink-0 shadow-xs">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Back to program details"
          className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-high active:scale-95 flex items-center justify-center text-foreground transition-all shrink-0"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Lock size={13} />
            </div>
            <h1 className="font-headline text-title-md font-bold text-foreground truncate">
              {isCompleted ? "Booking Confirmed" : "Secure Stripe Checkout"}
            </h1>
          </div>
          <span className="font-body text-xs text-muted-foreground truncate">
            {isCompleted ? "Bricks 4 Kidz Franklin confirmation pass" : "Encrypted 256-bit SSL transaction"}
          </span>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1 p-4 pb-12 flex flex-col gap-5 max-w-lg mx-auto w-full">
        {isCompleted ? (
          <div className="flex flex-col items-center text-center py-6 gap-5 animate-in fade-in">
            <div className="w-20 h-20 rounded-full bg-secondary/20 text-secondary flex items-center justify-center shadow-inner">
              <CheckCircle2 size={44} />
            </div>

            <div className="flex flex-col gap-1.5">
              <h2 className="font-headline text-headline-md text-foreground font-bold">You're Enrolled!</h2>
              <p className="font-body text-body-sm text-muted-foreground max-w-xs">
                A receipt and onboarding packet have been sent to <strong className="text-foreground">{email || 'your email'}</strong>.
              </p>
            </div>

            {/* Confirmation Pass */}
            <div className="w-full rounded-2xl bg-surface-low p-5 text-left flex flex-col gap-3 border border-border shadow-xs">
              <div className="flex justify-between items-start text-body-sm gap-2">
                <span className="text-muted-foreground font-medium shrink-0">Program:</span>
                <span className="font-headline text-foreground font-bold text-right">{bookingItem.title}</span>
              </div>
              <div className="flex justify-between items-start text-body-sm gap-2">
                <span className="text-muted-foreground font-medium shrink-0">Location:</span>
                <span className="font-body text-foreground text-right">{bookingItem.subtitle || '215 Gothic Ct, Franklin TN'}</span>
              </div>
              <div className="flex justify-between items-center text-body-sm pt-3 border-t border-border">
                <span className="font-headline text-foreground font-bold">Total Paid:</span>
                <span className="font-mono text-title-lg text-primary font-bold">{bookingItem.price}</span>
              </div>
            </div>

            <div className="w-full pt-3">
              <Button variant="primary" size="lg" className="w-full" onClick={handleClose}>
                Done & Return to App
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Order Summary Box */}
            <div className="rounded-2xl bg-surface-low p-4 border border-border flex items-center justify-between shadow-xs">
              <div className="flex flex-col pr-2 min-w-0">
                <span className="font-headline text-title-md text-foreground font-bold line-clamp-1">
                  {bookingItem.title}
                </span>
                <span className="font-body text-body-sm text-muted-foreground truncate">
                  {bookingItem.subtitle || 'Bricks 4 Kidz • Franklin – Nashville'}
                </span>
              </div>
              <span className="font-mono text-title-lg text-primary font-bold shrink-0">
                {bookingItem.price}
              </span>
            </div>

            {/* Attendee Info Form */}
            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-1 text-left">
                <span className="font-body text-label-sm text-foreground font-semibold">Parent Full Name *</span>
                <input
                  type="text"
                  required
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Sarah Miller"
                  className="w-full rounded-xl bg-card border border-border px-3.5 py-2.5 font-body text-body-sm text-foreground focus:border-primary focus:ring-1 focus:ring-ring"
                />
              </label>
              <label className="flex flex-col gap-1 text-left">
                <span className="font-body text-label-sm text-foreground font-semibold">Email Address *</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="parent@example.com"
                  className="w-full rounded-xl bg-card border border-border px-3.5 py-2.5 font-body text-body-sm text-foreground focus:border-primary focus:ring-1 focus:ring-ring"
                />
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-1 text-left">
                <span className="font-body text-label-sm text-foreground font-semibold">Child's Name</span>
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="Leo"
                  className="w-full rounded-xl bg-card border border-border px-3.5 py-2.5 font-body text-body-sm text-foreground focus:border-primary focus:ring-1 focus:ring-ring"
                />
              </label>
              <label className="flex flex-col gap-1 text-left">
                <span className="font-body text-label-sm text-foreground font-semibold">Child's Age</span>
                <input
                  type="text"
                  value={childAge}
                  onChange={(e) => setChildAge(e.target.value)}
                  placeholder="7 yrs"
                  className="w-full rounded-xl bg-card border border-border px-3.5 py-2.5 font-body text-body-sm text-foreground focus:border-primary focus:ring-1 focus:ring-ring"
                />
              </label>
            </div>

            {/* Stripe Card Mock */}
            <div className="flex flex-col gap-2 pt-2 border-t border-border text-left">
              <div className="flex items-center justify-between">
                <span className="font-headline text-label-sm text-foreground flex items-center gap-1.5 font-bold">
                  <CreditCard size={15} className="text-primary" />
                  Payment Method
                </span>
                <span className="font-mono text-label-sm text-stripe font-bold">
                  stripe
                </span>
              </div>

              <div className="rounded-xl border border-border bg-card overflow-hidden shadow-xs">
                <div className="px-3.5 py-2.5 border-b border-border">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Card number"
                    className="w-full bg-transparent font-mono text-body-sm text-foreground focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-3 divide-x divide-border">
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="px-3 py-2.5 bg-transparent font-mono text-body-sm text-foreground focus:outline-none text-center"
                  />
                  <input
                    type="text"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    placeholder="CVC"
                    className="px-3 py-2.5 bg-transparent font-mono text-body-sm text-foreground focus:outline-none text-center"
                  />
                  <input
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="ZIP"
                    className="px-3 py-2.5 bg-transparent font-mono text-body-sm text-foreground focus:outline-none text-center"
                  />
                </div>
              </div>
            </div>

            {/* Pay Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="stripe"
                size="lg"
                isLoading={isProcessing}
                className="w-full gap-2 shadow-md rounded-xl font-bold py-3.5"
              >
                <span>Pay {bookingItem.price} with Stripe</span>
              </Button>
            </div>

            {/* Guarantee Footer */}
            <div className="flex items-center justify-center gap-2 text-label-sm text-muted-foreground text-center pt-1">
              <ShieldCheck size={16} className="text-secondary shrink-0" />
              <span>Official Bricks 4 Kidz Franklin 100% money-back satisfaction guarantee</span>
            </div>
          </form>
        )}
      </main>

    </div>
  );
};
