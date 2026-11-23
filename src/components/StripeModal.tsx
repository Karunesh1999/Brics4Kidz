import React, { useState } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { CreditCard, Lock, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
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

  if (!bookingItem) return null;

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
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <Lock size={16} />
          </div>
          <span>{isCompleted ? "Booking Confirmed!" : "Secure Stripe Checkout"}</span>
        </div>
      }
      description={isCompleted ? "Bricks 4 Kidz Franklin confirmation pass" : "Encrypted 256-bit SSL transaction"}
    >
      {isCompleted ? (
        <div className="flex flex-col items-center text-center py-4 gap-4 animate-in fade-in">
          <div className="w-16 h-16 rounded-full bg-secondary/20 text-secondary flex items-center justify-center">
            <CheckCircle2 size={36} />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="font-headline text-headline-md text-foreground font-bold">You're Enrolled!</h4>
            <p className="font-body text-body-sm text-muted-foreground max-w-xs">
              A receipt and onboarding packet have been sent to <strong className="text-foreground">{email || 'your email'}</strong>.
            </p>
          </div>

          <div className="w-full rounded-xl bg-surface-low p-4 text-left flex flex-col gap-2 border border-border">
            <div className="flex justify-between text-body-sm">
              <span className="text-muted-foreground font-medium">Program:</span>
              <span className="font-headline text-foreground font-bold text-right">{bookingItem.title}</span>
            </div>
            <div className="flex justify-between text-body-sm">
              <span className="text-muted-foreground font-medium">Location:</span>
              <span className="font-body text-foreground text-right">{bookingItem.subtitle || '215 Gothic Ct, Franklin TN'}</span>
            </div>
            <div className="flex justify-between text-body-sm pt-2 border-t border-border">
              <span className="font-headline text-foreground font-bold">Total Paid:</span>
              <span className="font-mono text-title-md text-primary font-bold">{bookingItem.price}</span>
            </div>
          </div>

          <div className="w-full flex gap-2 pt-2">
            <Button variant="primary" className="flex-1" onClick={handleClose}>
              Done & Return to App
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Order Summary Box */}
          <div className="rounded-xl bg-surface-low p-3.5 border border-border flex items-center justify-between">
            <div className="flex flex-col pr-2">
              <span className="font-headline text-title-md text-foreground font-bold line-clamp-1">
                {bookingItem.title}
              </span>
              <span className="font-body text-body-sm text-muted-foreground">
                {bookingItem.subtitle || 'Bricks 4 Kidz • Franklin – Nashville'}
              </span>
            </div>
            <span className="font-mono text-title-md text-primary font-bold shrink-0">
              {bookingItem.price}
            </span>
          </div>

          {/* Attendee Info */}
          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1 text-left">
              <span className="font-body text-label-sm text-foreground font-semibold">Parent Full Name *</span>
              <input
                type="text"
                required
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="Sarah Miller"
                className="w-full rounded-lg bg-card border border-border px-3 py-2 font-body text-body-sm text-foreground focus:border-primary focus:ring-1 focus:ring-ring"
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
                className="w-full rounded-lg bg-card border border-border px-3 py-2 font-body text-body-sm text-foreground focus:border-primary focus:ring-1 focus:ring-ring"
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
                className="w-full rounded-lg bg-card border border-border px-3 py-2 font-body text-body-sm text-foreground focus:border-primary focus:ring-1 focus:ring-ring"
              />
            </label>
            <label className="flex flex-col gap-1 text-left">
              <span className="font-body text-label-sm text-foreground font-semibold">Child's Age</span>
              <input
                type="text"
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
                placeholder="7 yrs"
                className="w-full rounded-lg bg-card border border-border px-3 py-2 font-body text-body-sm text-foreground focus:border-primary focus:ring-1 focus:ring-ring"
              />
            </label>
          </div>

          {/* Stripe Card Mock */}
          <div className="flex flex-col gap-2 pt-1 border-t border-border text-left">
            <div className="flex items-center justify-between">
              <span className="font-headline text-label-sm text-foreground flex items-center gap-1.5 font-bold">
                <CreditCard size={15} className="text-primary" />
                Payment Method
              </span>
              <span className="font-mono text-label-sm text-stripe font-bold">
                stripe
              </span>
            </div>

            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="px-3 py-2 border-b border-border">
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
                  className="px-3 py-2 bg-transparent font-mono text-body-sm text-foreground focus:outline-none text-center"
                />
                <input
                  type="text"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  placeholder="CVC"
                  className="px-3 py-2 bg-transparent font-mono text-body-sm text-foreground focus:outline-none text-center"
                />
                <input
                  type="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="ZIP"
                  className="px-3 py-2 bg-transparent font-mono text-body-sm text-foreground focus:outline-none text-center"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="stripe"
              size="lg"
              isLoading={isProcessing}
              className="w-full gap-2 shadow-md"
            >
              <Sparkles size={16} />
              <span>Pay {bookingItem.price} with Stripe</span>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-label-sm text-muted-foreground text-center">
            <ShieldCheck size={14} className="text-secondary shrink-0" />
            <span>Official Bricks 4 Kidz Franklin 100% money-back satisfaction guarantee</span>
          </div>
        </form>
      )}
    </Modal>
  );
};
