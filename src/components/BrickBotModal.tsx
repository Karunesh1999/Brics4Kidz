import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, CreditCard, ChevronRight } from 'lucide-react';
import { Button } from './ui/Button';
import type { AiChatMessage } from '../types';

interface BrickBotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenStripe: (item: { title: string; price: string; subtitle?: string }) => void;
}

export const BrickBotModal: React.FC<BrickBotModalProps> = ({
  isOpen,
  onClose,
  onOpenStripe,
}) => {
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'bot',
      text: "Hi! I'm BrickBot Franklin AI. I can answer questions about after-school enrichment, winter & summer camps, or book a Birthday Party in Franklin with instant Stripe reservation. What would you like to know?",
      time: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: AiChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      time: 'Now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "Thanks for asking! Our Franklin team is ready to welcome your child. Feel free to book directly or submit an inquiry.";
      let action: { type: 'stripe_checkout'; title: string; amount: string } | undefined;

      const lower = text.toLowerCase();
      if (lower.includes('party') || lower.includes('birthday')) {
        botResponse = "We offer two main Birthday Party packages in Franklin:\n• Premium: $249 for up to 10 guests (75 mins)\n• Supreme: $349 for up to 12 guests (90 mins + mini-figure favors)\n\nYou can host at your home or at our B4K Franklin Venue (+ $120 for 2 hours). Ready to hold your date?";
        action = {
          type: 'stripe_checkout',
          title: 'Supreme Birthday Party Package ($349)',
          amount: '$349.00',
        };
      } else if (lower.includes('winter') || lower.includes('camp') || lower.includes('summer')) {
        botResponse = "Winter LEGO Camps run at 215 Gothic Ct, Franklin:\n• Week 1: Dec 21–24 (4 full days, $279 or single full day $79)\n• Half-day track: $179 (AM/PM)\n• Week 2: Dec 28–31\n\nSummer 2026 early-bird waitlist is also open with robotics, space, and battlebots themes!";
        action = {
          type: 'stripe_checkout',
          title: 'Winter LEGO Camp Dec 21–24 ($279.00)',
          amount: '$279.00',
        };
      } else if (lower.includes('school') || lower.includes('after') || lower.includes('robot')) {
        botResponse = "Our Fall 2026 Junior Robotics & Engineering is currently active at Franklin Classical School (Nov 04 – Dec 16, $150). We also host Friday Homeschool LEGO STEM at Vine Christian Academy!";
        action = {
          type: 'stripe_checkout',
          title: 'Fall 2026 Junior Robotics & Engineering ($150.00)',
          amount: '$150.00',
        };
      } else if (lower.includes('location') || lower.includes('where') || lower.includes('address')) {
        botResponse = "Our primary Franklin facility is located at:\n📍 215 Gothic Ct Suite 102, Franklin, TN 37067 (inside Dance Mania Nashville).\nWe also serve schools and homes across Brentwood, Nashville, and Williamson County!";
      } else {
        botResponse = `Great question regarding "${text}"! We serve ages 3 to 13+ with DUPLO®, motorized LEGO® Technic gears, WeDo Robotics, and Python/Scratch coding. You can reserve any session right now via Stripe checkout.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'bot',
          text: botResponse,
          time: 'Now',
          actionPayload: action,
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  const handlePreset = (presetText: string) => {
    handleSend(presetText);
  };

  return (
    <div className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-[430px] h-[85vh] sm:h-[620px] rounded-t-2xl sm:rounded-2xl bg-card border border-border flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6 sm:zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-card border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shadow-sm">
              <Bot size={22} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-headline text-title-md text-foreground font-bold">BrickBot Franklin AI</h3>
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              </div>
              <p className="font-body text-label-sm text-secondary font-medium">Instant STEAM & Stripe concierge</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close BrickBot"
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-foreground hover:bg-surface-high transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} max-w-[90%] ${
                m.sender === 'user' ? 'self-end' : 'self-start'
              }`}
            >
              <div
                className={`p-3 rounded-2xl text-body-sm whitespace-pre-line ${
                  m.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none shadow-sm'
                    : 'bg-surface-low text-foreground border border-border rounded-bl-none shadow-sm'
                }`}
              >
                {m.text}
              </div>

              {/* Action Button inside Bot Message */}
              {m.actionPayload?.type === 'stripe_checkout' && (
                <div className="mt-2 w-full">
                  <Button
                    variant="accent"
                    size="sm"
                    className="w-full justify-between gap-2 shadow-sm text-label-sm py-2"
                    onClick={() => {
                      onOpenStripe({
                        title: m.actionPayload!.title,
                        price: m.actionPayload!.amount,
                      });
                      onClose();
                    }}
                  >
                    <span className="flex items-center gap-1">
                      <CreditCard size={14} />
                      Reserve via Stripe ({m.actionPayload.amount})
                    </span>
                    <ChevronRight size={14} />
                  </Button>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="self-start flex items-center gap-1.5 p-3 rounded-2xl bg-surface-low border border-border text-muted-foreground text-body-sm">
              <Bot size={14} className="animate-pulse text-primary" />
              <span>BrickBot is thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-card border-t border-border flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => handlePreset('What are your birthday party packages?')}
            className="shrink-0 text-label-sm px-3 py-1 rounded-full bg-surface-low text-primary border border-border hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
          >
            Party pricing?
          </button>
          <button
            onClick={() => handlePreset('When are Winter LEGO Camps and how much do they cost?')}
            className="shrink-0 text-label-sm px-3 py-1 rounded-full bg-surface-low text-primary border border-border hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
          >
            Winter Camp dates
          </button>
          <button
            onClick={() => handlePreset('Where are your Franklin locations?')}
            className="shrink-0 text-label-sm px-3 py-1 rounded-full bg-surface-low text-primary border border-border hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
          >
            Location info
          </button>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputText);
          }}
          className="p-3 bg-card border-t border-border flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about programs, ages, or Stripe booking..."
            className="flex-1 rounded-lg bg-surface-low border border-border px-3 py-2 text-body-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-ring"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            aria-label="Send message"
            className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 hover:bg-primary-hover transition-colors shrink-0"
          >
            <Send size={18} />
          </button>
        </form>

      </div>
    </div>
  );
};
