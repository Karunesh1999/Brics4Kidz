import React, { useState } from 'react';
import { Link, useOutletContext, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Wrench, Users, Lightbulb, School, Trees, Cake, MapPin, ChevronRight, Check, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { SCHEDULES, REVIEWS } from '../data/mockData';
import type { ScheduleItem } from '../types';

export const HomePage: React.FC = () => {
  const { onOpenStripe } = useOutletContext<{
    onOpenStripe: (item: { title: string; price: string; subtitle?: string }) => void;
  }>();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<'all' | 'after-school' | 'camps' | 'homeschool'>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  
  // Quick Inquiry state
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPkg, setInquiryPkg] = useState('Premium — $249 (10 guests, 75 mins)');
  const [inquiryLoc, setInquiryLoc] = useState('My Home (Franklin / Nashville area)');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Filter schedules
  const filteredSchedules = SCHEDULES.filter((sch) => {
    const matchCat = selectedCategory === 'all' || sch.category === selectedCategory;
    const matchLoc = selectedLocation === 'all' || sch.locationId === selectedLocation;
    return matchCat && matchLoc;
  });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  return (
    <div className="flex flex-col gap-gutter-lg pt-gutter-md pb-6">

      {/* Hero Section */}
      <section
        aria-label="STEAM Learning Overview"
        className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm"
      >
        <img
          src="/images/client/hero-banner-main.png"
          onError={(e) => { e.currentTarget.src = '/images/hero-lego.jpg'; }}
          alt="Bricks 4 Kidz Official STEAM Learning"
          className="w-full h-48 object-cover"
        />
        <div className="p-gutter-md flex flex-col gap-gutter-sm">
          <Badge variant="primary" className="self-start">
            We Learn. We Build. We Play.
          </Badge>
          <h1 className="font-headline text-display-lg-mobile text-foreground text-balance font-bold leading-tight">
            Building Tomorrow's Innovators
          </h1>

          {/* 4 Core Benefits */}
          <div className="grid grid-cols-2 gap-gutter-sm pt-gutter-xs">
            <div className="rounded-xl bg-surface-low p-gutter-sm flex items-center gap-2 border border-border">
              <Star size={18} className="text-destructive shrink-0" />
              <span className="font-body text-body-sm text-foreground font-semibold">Self-Esteem</span>
            </div>
            <div className="rounded-xl bg-surface-low p-gutter-sm flex items-center gap-2 border border-border">
              <Wrench size={18} className="text-primary shrink-0" />
              <span className="font-body text-body-sm text-foreground font-semibold">Fine-Motor Skills</span>
            </div>
            <div className="rounded-xl bg-surface-low p-gutter-sm flex items-center gap-2 border border-border">
              <Users size={18} className="text-secondary shrink-0" />
              <span className="font-body text-body-sm text-foreground font-semibold">Social Skills</span>
            </div>
            <div className="rounded-xl bg-surface-low p-gutter-sm flex items-center gap-2 border border-border">
              <Lightbulb size={18} className="text-accent-foreground shrink-0" />
              <span className="font-body text-body-sm text-foreground font-semibold">Creativity</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Programs Quick Navigator */}
      <section id="programs" aria-labelledby="programs-heading" className="flex flex-col gap-gutter-sm">
        <div className="flex items-center justify-between">
          <h2 id="programs-heading" className="font-headline text-headline-md text-foreground font-bold">
            Our Programs
          </h2>
          <Link
            to="/services"
            className="font-headline text-label-lg text-primary hover:underline flex items-center gap-1"
          >
            <span>Explore all</span>
            <ChevronRight size={16} />
          </Link>
        </div>

        <div className="flex flex-col gap-gutter-sm">
          {/* School Programs */}
          <Link to="/services/after-school-enrichment">
            <Card variant="interactive" className="flex items-center justify-between gap-gutter-md">
              <div className="flex items-center gap-gutter-md">
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <School size={22} />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-headline text-title-md text-foreground font-bold">School Programs</h3>
                  <p className="font-body text-body-sm text-muted-foreground">After-school enrichment, robotics & pre-school</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-primary shrink-0" />
            </Card>
          </Link>

          {/* Holiday & Summer Camps */}
          <Link to="/camps">
            <Card variant="interactive" className="flex items-center justify-between gap-gutter-md">
              <div className="flex items-center gap-gutter-md">
                <div className="w-11 h-11 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <Trees size={22} />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-headline text-title-md text-foreground font-bold">Holiday & Summer Camps</h3>
                  <p className="font-body text-body-sm text-muted-foreground">Thanksgiving, Winter & Summer LEGO® Camps</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-primary shrink-0" />
            </Card>
          </Link>

          {/* Birthday Parties */}
          <Link to="/parties">
            <Card variant="interactive" className="flex items-center justify-between gap-gutter-md">
              <div className="flex items-center gap-gutter-md">
                <div className="w-11 h-11 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
                  <Cake size={22} />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-headline text-title-md text-foreground font-bold">Birthday Parties</h3>
                  <p className="font-body text-body-sm text-muted-foreground">Premium ($249) & Supreme ($349) packages</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-primary shrink-0" />
            </Card>
          </Link>
        </div>
      </section>

      {/* Upcoming Schedules */}
      <section id="schedules" aria-labelledby="schedules-heading" className="flex flex-col gap-gutter-sm">
        <div className="flex items-center justify-between">
          <h2 id="schedules-heading" className="font-headline text-headline-md text-foreground font-bold">
            Upcoming Schedules
          </h2>
          <span className="font-mono text-label-sm text-muted-foreground tabular-nums font-semibold bg-surface-container px-2.5 py-0.5 rounded-full border border-border">
            {filteredSchedules.length} {filteredSchedules.length === 1 ? 'program' : 'programs'}
          </span>
        </div>

        {/* Program Filter Chips */}
        <div className="flex items-center gap-gutter-sm overflow-x-auto pb-1" role="group" aria-label="Filter by program type">
          {[
            { id: 'all', label: 'All Programs' },
            { id: 'after-school', label: 'After School' },
            { id: 'camps', label: 'Camps' },
            { id: 'homeschool', label: 'Homeschool' },
          ].map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`shrink-0 inline-flex items-center px-4 py-1.5 rounded-full font-body text-label-sm transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground font-bold shadow-sm'
                    : 'bg-card text-muted-foreground border border-border hover:bg-surface-low'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Location Selector */}
        <label className="flex flex-col gap-gutter-xs">
          <span className="sr-only">Filter by location</span>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full rounded-xl bg-card border border-border px-gutter-md py-2.5 font-body text-body-sm text-foreground focus:border-primary focus:ring-1 focus:ring-ring"
          >
            <option value="all">All Franklin & Nashville Locations</option>
            <option value="gothic">215 Gothic Ct Suite 102, Franklin</option>
            <option value="classical">Franklin Classical School</option>
            <option value="vine">Vine Christian Academy</option>
          </select>
        </label>

        {/* Schedule Cards List */}
        <div className="flex flex-col gap-gutter-sm">
          {filteredSchedules.map((sch: ScheduleItem) => (
            <Card key={sch.id} className="flex flex-col gap-gutter-sm shadow-sm hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between gap-gutter-sm">
                  <Badge variant={sch.category === 'after-school' ? 'primary' : sch.category === 'camps' ? 'secondary' : 'default'}>
                    {sch.categoryLabel}
                  </Badge>
                  <span className="font-mono text-label-sm text-muted-foreground tabular-nums font-semibold">
                    {sch.sessions} • {sch.spotsLeft} spots left
                  </span>
                </div>
                <CardTitle className="leading-snug">{sch.title}</CardTitle>
                <CardDescription className="flex items-center gap-1.5">
                  <MapPin size={15} className="text-destructive shrink-0" />
                  <span>{sch.location}</span>
                </CardDescription>
              </CardHeader>

              <div>
                <p className="font-body text-body-sm text-muted-foreground tabular-nums">
                  {sch.dates} • {sch.time}
                </p>
              </div>

              <CardFooter>
                <span className="font-mono text-mono-md text-primary font-bold tabular-nums">
                  {sch.price} • {sch.age}
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() =>
                    onOpenStripe({
                      title: sch.title,
                      price: sch.price,
                      subtitle: `${sch.dates} • ${sch.location}`,
                    })
                  }
                >
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))}

          {filteredSchedules.length === 0 && (
            <div className="p-6 text-center rounded-xl bg-surface-low border border-border text-body-sm text-muted-foreground">
              No programs found matching the selected filters. Try switching to "All Programs".
            </div>
          )}
        </div>
      </section>

      {/* What Kids Say About Us */}
      <section aria-labelledby="reviews-heading" className="flex flex-col gap-gutter-sm">
        <div className="flex items-center justify-between">
          <h2 id="reviews-heading" className="font-headline text-headline-md text-foreground font-bold">
            What Kids Say About Us
          </h2>
          <Link to="/about" className="font-headline text-label-sm text-primary hover:underline">
            Read stories
          </Link>
        </div>
        <div className="flex gap-gutter-sm overflow-x-auto pb-2 -mx-page-margin px-page-margin">
          {REVIEWS.slice(0, 4).map((rev) => (
            <Card
              key={rev.id}
              variant="elevated"
              className="min-w-[260px] max-w-[280px] shrink-0 flex flex-col gap-gutter-sm"
            >
              <div className="flex items-center justify-between gap-gutter-sm">
                <h3 className="font-headline text-title-md text-foreground font-bold">{rev.author}</h3>
                <span className="font-body text-body-sm font-semibold text-secondary">{rev.role}</span>
              </div>
              <p className="font-body text-body-md text-muted-foreground italic leading-relaxed">
                {rev.quote}
              </p>
              <div className="flex items-center gap-1 text-accent-foreground pt-1 border-t border-border mt-auto">
                {Array.from({ length: rev.stars }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Party & Program Inquiry Form */}
      <section
        id="party-inquiry"
        aria-labelledby="inquiry-heading"
        className="rounded-2xl bg-card border border-border p-gutter-md flex flex-col gap-gutter-md shadow-sm"
      >
        <div className="flex flex-col gap-gutter-xs">
          <h2 id="inquiry-heading" className="font-headline text-headline-md text-foreground font-bold">
            Book a Party or Ask Us
          </h2>
          <p className="font-body text-body-sm text-muted-foreground">
            Check birthday party availability, school partnerships, or reserve with instant Stripe checkout.
          </p>
        </div>

        {inquirySubmitted ? (
          <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/30 text-secondary flex flex-col items-center gap-2 text-center animate-in fade-in">
            <Check size={28} className="text-secondary" />
            <h4 className="font-headline text-title-md font-bold">Inquiry Received!</h4>
            <p className="font-body text-body-sm text-foreground">
              BrickBot Franklin has sent availability details and a direct Stripe reservation link to <strong>{inquiryEmail}</strong>.
            </p>
            <Button
              variant="secondary"
              size="sm"
              className="mt-2"
              onClick={() => setInquirySubmitted(false)}
            >
              Send Another Request
            </Button>
          </div>
        ) : (
          <form onSubmit={handleInquirySubmit} className="flex flex-col gap-gutter-md">
            <label className="flex flex-col gap-gutter-xs w-full">
              <span className="font-body text-label-sm text-foreground font-semibold">Parent / Host Name *</span>
              <input
                type="text"
                required
                value={inquiryName}
                onChange={(e) => setInquiryName(e.target.value)}
                placeholder="First & Last Name"
                className="w-full rounded-xl bg-card border border-border px-gutter-md py-2.5 font-body text-body-md text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-ring"
              />
            </label>

            <label className="flex flex-col gap-gutter-xs w-full">
              <span className="font-body text-label-sm text-foreground font-semibold">Email Address *</span>
              <input
                type="email"
                required
                value={inquiryEmail}
                onChange={(e) => setInquiryEmail(e.target.value)}
                placeholder="parent@example.com"
                className="w-full rounded-xl bg-card border border-border px-gutter-md py-2.5 font-body text-body-md text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-ring"
              />
            </label>

            <label className="flex flex-col gap-gutter-xs w-full">
              <span className="font-body text-label-sm text-foreground font-semibold">Party Package</span>
              <select
                value={inquiryPkg}
                onChange={(e) => setInquiryPkg(e.target.value)}
                className="w-full rounded-xl bg-card border border-border px-gutter-md py-2.5 font-body text-body-md text-foreground focus:border-primary focus:ring-1 focus:ring-ring"
              >
                <option>Premium — $249 (10 guests, 75 mins)</option>
                <option>Supreme — $349 (12 guests, 90 mins)</option>
                <option>After-School Partnership Inquiry</option>
              </select>
            </label>

            <label className="flex flex-col gap-gutter-xs w-full">
              <span className="font-body text-label-sm text-foreground font-semibold">Location Preference</span>
              <select
                value={inquiryLoc}
                onChange={(e) => setInquiryLoc(e.target.value)}
                className="w-full rounded-xl bg-card border border-border px-gutter-md py-2.5 font-body text-body-md text-foreground focus:border-primary focus:ring-1 focus:ring-ring"
              >
                <option>My Home (Franklin / Nashville area)</option>
                <option>B4K Venue ($120 for 2 hours)</option>
                <option>Other Venue / School</option>
              </select>
            </label>

            <Button variant="primary" size="lg" type="submit" className="w-full">
              Check Availability & Continue
            </Button>
          </form>
        )}
      </section>

    </div>
  );
};
