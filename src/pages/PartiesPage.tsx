import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/Select';
import { PARTY_PACKAGES } from '../data/mockData';
import { Check, Star, PartyPopper, Gift } from 'lucide-react';

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isSupreme = selectedPkg.includes('Supreme');
    const basePrice = isSupreme ? 349 : 249;
    const venuePrice = selectedLoc.includes('Venue') ? 120 : 0;
    const totalPrice = basePrice + venuePrice;

    onOpenStripe({
      title: `${selectedPkg.split('—')[0].trim()} (${selectedTheme})`,
      price: `$${totalPrice}.00`,
      subtitle: `${hostName ? `Host: ${hostName} • ` : ''}${selectedLoc}`,
    });
  };

  const isPremium = selectedPkg.includes('Premium');
  const isSupreme = selectedPkg.includes('Supreme');

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
            className={`w-full h-10 text-xs font-bold rounded-xl mt-1 transition-all ${
              isPremium ? 'shadow-xs' : 'hover:bg-slate-50'
            }`}
          >
            {isPremium ? '✓ Premium Package Selected' : 'Select Premium Package'}
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
              isSupreme ? 'shadow-xs' : 'hover:bg-slate-50'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleSelectPackage('Supreme — $349 (12 guests, 90m)');
            }}
          >
            {isSupreme ? (
              <>
                <Check size={16} />
                <span>✓ Supreme Package Selected</span>
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
        className="rounded-2xl bg-card border border-border p-gutter-md flex flex-col gap-gutter-md shadow-sm"
      >
        <div>
          <h2 id="host-heading" className="font-headline text-headline-md text-foreground font-bold">
            Party Reservation Form
          </h2>
          <p className="font-body text-body-sm text-muted-foreground">
            Lock your preferred date and pay a refundable deposit securely via Stripe.
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-gutter-md">
          <div className="flex flex-col gap-gutter-xs">
            <span className="font-body text-label-sm text-foreground font-semibold">Selected Package</span>
            <Select value={selectedPkg} onValueChange={setSelectedPkg}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select package" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Premium — $249 (10 guests, 75m)">Premium — $249 (10 guests, 75m)</SelectItem>
                <SelectItem value="Supreme — $349 (12 guests, 90m)">Supreme — $349 (12 guests, 90m)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-gutter-xs">
            <span className="font-body text-label-sm text-foreground font-semibold">Party Theme</span>
            <Select value={selectedTheme} onValueChange={setSelectedTheme}>
              <SelectTrigger className="w-full">
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

          <div className="flex flex-col gap-gutter-xs">
            <span className="font-body text-label-sm text-foreground font-semibold">Location / Venue</span>
            <Select value={selectedLoc} onValueChange={setSelectedLoc}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select location / venue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="My Home (Franklin / Brentwood / Nashville)">My Home (Franklin / Brentwood / Nashville)</SelectItem>
                <SelectItem value="B4K Venue ($120 for 2 hours at 215 Gothic Ct)">B4K Venue ($120 for 2 hours at 215 Gothic Ct)</SelectItem>
                <SelectItem value="Other Venue / School / Church">Other Venue / School / Church</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <label className="flex flex-col gap-gutter-xs">
            <span className="font-body text-label-sm text-foreground font-semibold">Host Name *</span>
            <input
              type="text"
              required
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              placeholder="First & Last Name"
              className="w-full rounded-xl bg-card border border-border px-gutter-md py-2.5 font-body text-body-md text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-ring"
            />
          </label>

          <label className="flex flex-col gap-gutter-xs">
            <span className="font-body text-label-sm text-foreground font-semibold">Phone & Preferred Party Date *</span>
            <input
              type="text"
              required
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              placeholder="(615) 555-0142 • Sat Dec 12 at 2:00 PM"
              className="w-full rounded-xl bg-card border border-border px-gutter-md py-2.5 font-body text-body-md text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-ring"
            />
          </label>

          <Button variant="primary" size="lg" type="submit" className="w-full gap-2 shadow-md">
            <span>Reserve Date with Stripe Checkout</span>
          </Button>
        </form>
      </section>

    </div>
  );
};
