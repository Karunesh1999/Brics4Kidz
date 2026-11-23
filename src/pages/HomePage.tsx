import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Star, Wrench, Users, Lightbulb, School, Trees, Cake, MapPin, ChevronRight, Check, PartyPopper, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/Select';
import { SCHEDULES } from '../data/mockData';
import type { ScheduleItem } from '../types';

export const HomePage: React.FC = () => {
  const { onOpenStripe } = useOutletContext<{
    onOpenStripe: (item: { title: string; price: string; subtitle?: string }) => void;
  }>();

  const [selectedCategory, setSelectedCategory] = useState<'all' | 'after-school' | 'camps' | 'homeschool'>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  // Quick Inquiry state
  const [isFormOpen, setIsFormOpen] = useState(false);
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
                className={`shrink-0 inline-flex items-center px-4 py-1.5 rounded-full font-body text-label-sm transition-all ${isActive
                  ? 'bg-primary text-primary-foreground font-bold shadow-sm'
                  : 'bg-card text-muted-foreground border border-border hover:bg-surface-low'
                  }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Location Selector (shadcn/ui Select) */}
        <div className="w-full">
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Franklin & Nashville Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Franklin & Nashville Locations</SelectItem>
              <SelectItem value="gothic">215 Gothic Ct Suite 102, Franklin</SelectItem>
              <SelectItem value="classical">Franklin Classical School</SelectItem>
              <SelectItem value="vine">Vine Christian Academy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Schedule Cards List */}
        <div className="flex flex-col gap-gutter-sm">
          {filteredSchedules.map((sch: ScheduleItem) => (
            <Card key={sch.id} className="flex flex-col gap-gutter-sm shadow-sm hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between gap-gutter-sm">
                  <Badge variant={sch.category === 'after-school' ? 'primary' : sch.category === 'camps' ? 'secondary' : 'default'}>
                    {sch.categoryLabel}
                  </Badge>
                  <span className="font-body text-xs font-medium text-slate-500">
                    {sch.sessions} • <span className="font-semibold text-slate-700">{sch.spotsLeft} spots left</span>
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
                <div className="flex items-baseline gap-1.5 font-body">
                  <span className="text-base font-bold text-primary tracking-tight">
                    {sch.price}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    • {sch.age}
                  </span>
                </div>
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

      {/* Book a Party or Ask Us - Interactive Card */}
      <section
        id="party-inquiry"
        aria-labelledby="inquiry-heading"
        className="rounded-2xl bg-card border border-border p-gutter-md flex flex-col gap-gutter-md shadow-sm transition-all"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center shrink-0 mt-0.5">
              <PartyPopper size={20} />
            </div>
            <div className="flex flex-col gap-0.5">
              <h2 id="inquiry-heading" className="font-headline text-headline-md text-foreground font-bold">
                Book a Party or Ask Us
              </h2>
            </div>
          </div>
          {isFormOpen && (
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="p-1 rounded-lg text-muted-foreground hover:bg-surface-low hover:text-foreground transition-colors shrink-0"
              aria-label="Collapse form"
            >
              <ChevronUp size={20} />
            </button>
          )}
        </div>

        {!isFormOpen ? (
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsFormOpen(true)}
            className="w-full gap-2 shadow-sm font-bold mt-1"
          >
            <span>Book a Party or Ask Us</span>
            <ChevronDown size={16} />
          </Button>
        ) : inquirySubmitted ? (
          <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/30 text-secondary flex flex-col items-center gap-2 text-center animate-in fade-in">
            <Check size={28} className="text-secondary" />
            <h4 className="font-headline text-title-md font-bold">Inquiry Received!</h4>
            <p className="font-body text-body-sm text-foreground">
              BrickBot Franklin has sent availability details and a direct Stripe reservation link to <strong>{inquiryEmail}</strong>.
            </p>
            <div className="flex gap-2 mt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setInquirySubmitted(false)}
              >
                Send Another Request
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFormOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleInquirySubmit} className="flex flex-col gap-gutter-md animate-in fade-in duration-200">
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

            <div className="flex flex-col gap-gutter-xs w-full">
              <span className="font-body text-label-sm text-foreground font-semibold">Party Package</span>
              <Select value={inquiryPkg} onValueChange={setInquiryPkg}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select party package" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Premium — $249 (10 guests, 75 mins)">Premium — $249 (10 guests, 75 mins)</SelectItem>
                  <SelectItem value="Supreme — $349 (12 guests, 90 mins)">Supreme — $349 (12 guests, 90 mins)</SelectItem>
                  <SelectItem value="After-School Partnership Inquiry">After-School Partnership Inquiry</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-gutter-xs w-full">
              <span className="font-body text-label-sm text-foreground font-semibold">Location Preference</span>
              <Select value={inquiryLoc} onValueChange={setInquiryLoc}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select location preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="My Home (Franklin / Nashville area)">My Home (Franklin / Nashville area)</SelectItem>
                  <SelectItem value="B4K Venue ($120 for 2 hours)">B4K Venue ($120 for 2 hours)</SelectItem>
                  <SelectItem value="Other Venue / School">Other Venue / School</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button
                variant="primary"
                size="md"
                type="submit"
                className="flex-1 h-11 rounded-xl !text-white font-bold gap-2 shadow-sm text-xs sm:text-sm"
              >
                <span>Check Availability & Continue</span>
                <ArrowRight size={15} className="text-white shrink-0" />
              </Button>
              <Button
                variant="outline"
                size="md"
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="h-11 px-4 rounded-xl text-xs sm:text-sm font-semibold hover:bg-slate-50 text-slate-600"
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </section>

    </div>
  );
};
