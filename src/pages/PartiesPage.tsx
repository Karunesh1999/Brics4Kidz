import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { PARTY_PACKAGES } from '../data/mockData';
import { Check, Star, PartyPopper, Sparkles, Gift } from 'lucide-react';

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
    formEl?.scrollIntoView({ behavior: 'smooth' });
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
          <p className="font-body text-body-md text-muted-foreground leading-relaxed">
            Hosted at your home or our Franklin venue. Our certified party host brings all LEGO® bricks, motorized builds, and derby racing games.
          </p>
        </div>
      </section>

      {/* Package Comparison */}
      <section aria-labelledby="packages-heading" className="flex flex-col gap-gutter-sm">
        <h2 id="packages-heading" className="font-headline text-headline-md text-foreground font-bold">
          Choose Your Package
        </h2>

        {/* Premium */}
        <Card className="flex flex-col gap-gutter-sm shadow-sm hover:border-primary transition-colors">
          <div className="flex items-center justify-between gap-gutter-sm">
            <div>
              <h3 className="font-headline text-title-md text-foreground font-bold">Premium Party</h3>
              <p className="font-body text-body-sm text-muted-foreground">Up to 10 guests • 75 minutes</p>
            </div>
            <span className="font-mono text-title-md text-primary font-bold tabular-nums">$249.00</span>
          </div>

          <p className="font-body text-body-md text-muted-foreground">
            Dedicated Bricks 4 Kidz host, motorized model build, creative free play, and birthday child gift. (Venue not included.)
          </p>

          <div className="flex flex-col gap-1.5 py-2 border-y border-border">
            {PARTY_PACKAGES[0].features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-body-sm text-foreground">
                <Check size={16} className="text-secondary shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-gutter-xs">
            <span className="text-xs text-muted-foreground font-medium">Themes: Minecraft, Star Wars, Heroes</span>
            <Button
              variant="outline"
              size="md"
              onClick={() => handleSelectPackage('Premium — $249 (10 guests, 75m)')}
            >
              Select Premium
            </Button>
          </div>
        </Card>

        {/* Supreme */}
        <Card className="flex flex-col gap-gutter-sm shadow-md border-2 border-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-label-sm font-bold px-3 py-1 rounded-bl-xl shadow-xs flex items-center gap-1">
            <Star size={13} fill="currentColor" />
            <span>Most Popular</span>
          </div>

          <div className="flex items-center justify-between gap-gutter-sm pt-2">
            <div>
              <h3 className="font-headline text-title-md text-foreground font-bold">Supreme Party</h3>
              <p className="font-body text-body-sm text-muted-foreground">Up to 12 guests • 90 minutes</p>
            </div>
            <span className="font-mono text-title-md text-primary font-bold tabular-nums">$349.00</span>
          </div>

          <p className="font-body text-body-md text-muted-foreground">
            Everything in Premium plus 2 extra guests, 15 extra minutes, LEGO® mini-figure favors for every child, and derby car tournament.
          </p>

          <div className="flex flex-col gap-1.5 py-2 border-y border-border">
            {PARTY_PACKAGES[1].features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-body-sm text-foreground font-medium">
                <Check size={16} className="text-primary shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-gutter-xs">
            <span className="text-xs text-secondary font-bold flex items-center gap-1">
              <Gift size={14} /> Includes Mini-Figure Favors
            </span>
            <Button
              variant="primary"
              size="md"
              className="gap-2 shadow-sm font-bold"
              onClick={() => handleSelectPackage('Supreme — $349 (12 guests, 90m)')}
            >
              <PartyPopper size={16} />
              <span>Select Supreme</span>
            </Button>
          </div>
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
          <label className="flex flex-col gap-gutter-xs">
            <span className="font-body text-label-sm text-foreground font-semibold">Selected Package</span>
            <select
              value={selectedPkg}
              onChange={(e) => setSelectedPkg(e.target.value)}
              className="w-full rounded-xl bg-card border border-border px-gutter-md py-2.5 font-body text-body-md text-foreground focus:border-primary focus:ring-1 focus:ring-ring"
            >
              <option>Premium — $249 (10 guests, 75m)</option>
              <option>Supreme — $349 (12 guests, 90m)</option>
            </select>
          </label>

          <label className="flex flex-col gap-gutter-xs">
            <span className="font-body text-label-sm text-foreground font-semibold">Party Theme</span>
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="w-full rounded-xl bg-card border border-border px-gutter-md py-2.5 font-body text-body-md text-foreground focus:border-primary focus:ring-1 focus:ring-ring"
            >
              <option>Minecraft Block World</option>
              <option>Star Wars Galaxy Adventures</option>
              <option>Superheroes In Motion</option>
              <option>Battlebots Arena Knockout</option>
              <option>Ninjago Spinners Derby</option>
            </select>
          </label>

          <label className="flex flex-col gap-gutter-xs">
            <span className="font-body text-label-sm text-foreground font-semibold">Location / Venue</span>
            <select
              value={selectedLoc}
              onChange={(e) => setSelectedLoc(e.target.value)}
              className="w-full rounded-xl bg-card border border-border px-gutter-md py-2.5 font-body text-body-md text-foreground focus:border-primary focus:ring-1 focus:ring-ring"
            >
              <option>My Home (Franklin / Brentwood / Nashville)</option>
              <option>B4K Venue ($120 for 2 hours at 215 Gothic Ct)</option>
              <option>Other Venue / School / Church</option>
            </select>
          </label>

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
            <Sparkles size={16} />
            <span>Reserve Date with Stripe Checkout</span>
          </Button>
        </form>
      </section>

    </div>
  );
};
