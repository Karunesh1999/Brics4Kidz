import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/Select';
import { PARTY_PACKAGES } from '../data/mockData';
import { Check, Star, PartyPopper, Gift, User, Calendar, Sparkles, MapPin, Lock, ShieldCheck } from 'lucide-react';

export const PartiesPage: React.FC = () => {
  const { onOpenStripe } = useOutletContext<{
    onOpenStripe: (item: { title: string; price: string; subtitle?: string }) => void;
  }>();

  const [selectedPkg, setSelectedPkg] = useState('Supreme — $349 (12 guests, 90m)');
  const [selectedLoc, setSelectedLoc] = useState('My Home (Franklin / Brentwood / Nashville)');
  const [selectedTheme, setSelectedTheme] = useState('Minecraft Block World');
  const [hostName, setHostName] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  const handleSelectPackage = (pkgName: string) => {
    setSelectedPkg(pkgName);
    const formEl = document.getElementById('party-form');
    if (formEl) {
      const targetY = formEl.getBoundingClientRect().top + window.scrollY - 15;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  const isPremium = selectedPkg.includes('Premium');
  const isSupreme = selectedPkg.includes('Supreme');
  const basePrice = isSupreme ? 349 : 249;
  const venuePrice = selectedLoc.includes('Venue') ? 120 : 0;
  const totalPrice = basePrice + venuePrice;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenStripe({
      title: `${selectedPkg.split('—')[0].trim()} (${selectedTheme})`,
      price: `$${totalPrice}.00`,
      subtitle: `${hostName ? `Host: ${hostName} • ` : ''}${selectedLoc}`,
    });
  };

  return (
    <div className="flex flex-col gap-gutter-lg pt-gutter-md pb-12">
      
      {/* Birthday Hero */}
      <section className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm">
        <img
          src="/images/client/birthday-party-hero.jpg"
          onError={(e) => { e.currentTarget.src = '/images/parties.jpg'; }}
          alt="Bricks 4 Kidz Official Birthday Parties in Franklin"
          className="w-full h-44 object-cover"
        />
        <div className="p-gutter-md flex flex-col gap-gutter-xs">
          <Badge variant="destructive" className="self-start">
            LEGO®-Themed Celebrations
          </Badge>
          <h1 className="font-headline text-display-lg-mobile text-foreground font-bold leading-tight">
            Unforgettable Birthday Parties
          </h1>
        </div>
      </section>

      {/* Package Comparison */}
      <section aria-labelledby="packages-heading" className="flex flex-col gap-gutter-sm">
        <h2 id="packages-heading" className="font-headline text-headline-md text-foreground font-bold">
          Choose Your Package
        </h2>

        {/* Premium */}
        <Card 
          onClick={() => handleSelectPackage('Premium — $249 (10 guests, 75m)')}
          className={`flex flex-col gap-3 transition-all cursor-pointer ${
            isPremium 
              ? 'border-2 border-primary shadow-md ring-1 ring-primary/20 bg-primary/[0.02]' 
              : 'border border-border shadow-sm hover:border-primary/50'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline text-lg font-bold text-foreground leading-tight">Premium Party</h3>
                {isPremium && (
                  <span className="text-[10px] font-bold bg-primary text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Check size={11} /> Selected
                  </span>
                )}
              </div>
              <p className="font-body text-xs text-muted-foreground mt-0.5">Up to 10 guests • 75 minutes</p>
            </div>
            <span className="font-headline text-xl font-bold text-primary tracking-tight shrink-0">$249.00</span>
          </div>

          <div className="flex flex-col gap-2 py-2.5 border-y border-border">
            {PARTY_PACKAGES[0].features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-foreground">
                <Check size={15} className="text-secondary shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="font-semibold text-slate-700">Themes:</span>
            <span>Minecraft, Star Wars, Superheroes, Derby</span>
          </div>

          <Button
            variant={isPremium ? 'primary' : 'outline'}
            size="md"
            onClick={(e) => {
              e.stopPropagation();
              handleSelectPackage('Premium — $249 (10 guests, 75m)');
            }}
            className={`w-full h-10 text-xs font-bold rounded-xl mt-1 gap-2 transition-all ${
              isPremium ? 'shadow-xs !text-white' : 'hover:bg-slate-50'
            }`}
          >
            {isPremium ? (
              <>
                <Check size={16} />
                <span>Premium Package Selected</span>
              </>
            ) : (
              <>
                <PartyPopper size={15} />
                <span>Select Premium Package</span>
              </>
            )}
          </Button>
        </Card>

        {/* Supreme */}
        <Card 
          onClick={() => handleSelectPackage('Supreme — $349 (12 guests, 90m)')}
          className={`flex flex-col gap-3 relative overflow-hidden transition-all cursor-pointer ${
            isSupreme 
              ? 'border-2 border-primary shadow-md ring-1 ring-primary/20 bg-primary/[0.02]' 
              : 'border border-border shadow-sm hover:border-primary/50'
          }`}
        >
          <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-xs flex items-center gap-1">
            <Star size={12} fill="currentColor" />
            <span>Most Popular</span>
          </div>

          <div className="flex items-start justify-between gap-3 pt-1">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline text-lg font-bold text-foreground leading-tight">Supreme Party</h3>
                {isSupreme && (
                  <span className="text-[10px] font-bold bg-primary text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Check size={11} /> Selected
                  </span>
                )}
              </div>
              <p className="font-body text-xs text-muted-foreground mt-0.5">Up to 12 guests • 90 minutes</p>
            </div>
            <span className="font-headline text-xl font-bold text-primary tracking-tight shrink-0">$349.00</span>
          </div>

          <div className="flex flex-col gap-2 py-2.5 border-y border-border">
            {PARTY_PACKAGES[1].features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-foreground font-medium">
                <Check size={15} className="text-primary shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-secondary font-bold bg-secondary/10 px-3 py-2 rounded-xl border border-secondary/20">
            <span className="flex items-center gap-1.5">
              <Gift size={14} /> Includes Custom Mini-Figure Favors
            </span>
            <span className="text-[10px] bg-secondary text-white px-2 py-0.5 rounded-full font-bold">Included</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="font-semibold text-slate-700">Themes:</span>
            <span>Minecraft, Star Wars, Superheroes, Ninjago</span>
          </div>

          <Button
            variant={isSupreme ? 'primary' : 'outline'}
            size="md"
            className={`w-full h-10 text-xs font-bold rounded-xl mt-1 gap-2 transition-all ${
              isSupreme ? 'shadow-xs !text-white' : 'hover:bg-slate-50'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleSelectPackage('Supreme — $349 (12 guests, 90m)');
            }}
          >
            {isSupreme ? (
              <>
                <Check size={16} />
                <span>Supreme Package Selected</span>
              </>
            ) : (
              <>
                <PartyPopper size={15} />
                <span>Select Supreme Package</span>
              </>
            )}
          </Button>
        </Card>
      </section>

      {/* Party Host Information & Stripe Deposit */}
      <section
        id="party-form"
        aria-labelledby="host-heading"
        className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm flex flex-col"
      >
        {/* Form Header */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4 sm:p-5 border-b border-border/70 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center shrink-0 shadow-xs">
                <PartyPopper size={18} />
              </div>
              <h2 id="host-heading" className="font-headline text-lg sm:text-xl text-foreground font-bold leading-tight">
                Party Reservation Form
              </h2>
            </div>
            <p className="font-body text-xs text-muted-foreground mt-1.5">
              Lock your preferred date & time. Refundable deposit processed securely via Stripe.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
            <ShieldCheck size={14} />
            <span>Stripe Verified</span>
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="p-4 sm:p-5 flex flex-col gap-4">
          
          {/* Selected Package Selector */}
          <div className="flex flex-col gap-1.5">
            <span className="font-body text-xs text-foreground font-bold flex items-center justify-between">
              <span>Selected Package</span>
              <span className="text-[11px] text-primary font-semibold">Tap to switch</span>
            </span>
            
            {/* Quick Segmented Toggle */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100/90 rounded-xl border border-slate-200/80">
              <button
                type="button"
                onClick={() => setSelectedPkg('Premium — $249 (10 guests, 75m)')}
                className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  isPremium
                    ? 'bg-white text-primary shadow-xs border border-primary/20'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isPremium && <Check size={13} className="text-primary shrink-0" />}
                <span>Premium • $249</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPkg('Supreme — $349 (12 guests, 90m)')}
                className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 relative cursor-pointer ${
                  isSupreme
                    ? 'bg-white text-primary shadow-xs border border-primary/20'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isSupreme && <Check size={13} className="text-primary shrink-0" />}
                <span>Supreme • $349</span>
                <span className="text-[9px] bg-accent text-accent-foreground px-1 py-0.5 rounded font-extrabold uppercase leading-none">
                  Popular
                </span>
              </button>
            </div>

            <div className="text-[11px] text-muted-foreground px-1 flex items-center gap-1.5">
              <Gift size={13} className="text-secondary shrink-0" />
              <span>
                {isSupreme 
                  ? 'Includes up to 12 guests, 90 mins & custom mini-figures for every child' 
                  : 'Includes up to 10 guests, 75 mins & motorized LEGO project build'}
              </span>
            </div>
          </div>

          {/* Party Theme */}
          <div className="flex flex-col gap-1.5">
            <span className="font-body text-xs text-foreground font-bold flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-500" />
              <span>Party Theme</span>
            </span>
            <Select value={selectedTheme} onValueChange={setSelectedTheme}>
              <SelectTrigger className="w-full bg-slate-50/50 hover:bg-white text-left">
                <SelectValue placeholder="Select party theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Minecraft Block World">Minecraft Block World</SelectItem>
                <SelectItem value="Star Wars Galaxy Adventures">Star Wars Galaxy Adventures</SelectItem>
                <SelectItem value="Superheroes In Motion">Superheroes In Motion</SelectItem>
                <SelectItem value="Battlebots Arena Knockout">Battlebots Arena Knockout</SelectItem>
                <SelectItem value="Ninjago Spinners Derby">Ninjago Spinners Derby</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location / Venue */}
          <div className="flex flex-col gap-1.5">
            <span className="font-body text-xs text-foreground font-bold flex items-center gap-1.5">
              <MapPin size={14} className="text-destructive" />
              <span>Location / Venue</span>
            </span>
            <Select value={selectedLoc} onValueChange={setSelectedLoc}>
              <SelectTrigger className="w-full bg-slate-50/50 hover:bg-white text-left">
                <SelectValue placeholder="Select location / venue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="My Home (Franklin / Brentwood / Nashville)">
                  My Home (Franklin / Brentwood / Nashville)
                </SelectItem>
                <SelectItem value="B4K Venue ($120 for 2 hours at 215 Gothic Ct)">
                  B4K Center Venue ($120 for 2 hrs at 215 Gothic Ct)
                </SelectItem>
                <SelectItem value="Other Venue / School / Church">
                  Other Venue / School / Church Facility
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Host Name */}
          <div className="flex flex-col gap-1.5">
            <span className="font-body text-xs text-foreground font-bold flex items-center gap-1.5">
              <User size={14} className="text-primary" />
              <span>Host / Parent Name *</span>
            </span>
            <input
              type="text"
              required
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              placeholder="First & Last Name"
              className="w-full rounded-xl bg-slate-50/50 hover:bg-white focus:bg-white border border-border px-3.5 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>

          {/* Phone & Date */}
          <div className="flex flex-col gap-1.5">
            <span className="font-body text-xs text-foreground font-bold flex items-center gap-1.5">
              <Calendar size={14} className="text-primary" />
              <span>Phone & Preferred Date / Time *</span>
            </span>
            <input
              type="text"
              required
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              placeholder="(615) 555-0142 • Sat Dec 12 at 2:00 PM"
              className="w-full rounded-xl bg-slate-50/50 hover:bg-white focus:bg-white border border-border px-3.5 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>

          {/* Price Breakdown Summary */}
          <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3.5 flex flex-col gap-2 mt-1">
            <div className="flex justify-between items-center text-xs text-slate-600">
              <span>{isSupreme ? 'Supreme Package (12 guests, 90 min)' : 'Premium Package (10 guests, 75 min)'}</span>
              <span className="font-semibold text-slate-900">${basePrice}.00</span>
            </div>
            {venuePrice > 0 && (
              <div className="flex justify-between items-center text-xs text-slate-600">
                <span>Franklin Center Venue Add-on (2 Hours)</span>
                <span className="font-semibold text-slate-900">+${venuePrice}.00</span>
              </div>
            )}
            <div className="flex justify-between items-baseline pt-2 border-t border-slate-200">
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 text-xs">Total Reservation Deposit</span>
                <span className="text-[10px] text-emerald-700 font-medium">100% Refundable up to 7 days before</span>
              </div>
              <span className="font-headline text-lg font-bold text-primary tracking-tight">
                ${totalPrice}.00
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-primary hover:bg-primary-hover !text-white font-headline font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer mt-1"
          >
            <Lock size={16} className="text-white shrink-0" />
            <span className="text-white font-bold tracking-wide">
              Reserve Date with Stripe Checkout • ${totalPrice}.00
            </span>
          </button>

          {/* Security & Trust Badges */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-[11px] text-muted-foreground pt-1 flex-wrap">
            <span className="flex items-center gap-1 font-medium">
              <ShieldCheck size={13} className="text-emerald-600 shrink-0" /> 256-Bit SSL Encrypted
            </span>
            <span>•</span>
            <span className="font-medium">Instant Date Lock</span>
            <span>•</span>
            <span className="font-medium">Powered by Stripe</span>
          </div>

        </form>
      </section>

    </div>
  );
};
