import React, { useState } from 'react';
import { CAMPS } from '../data/mockData';
import { Card, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Sparkles, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import type { CampItem } from '../types';

export const CampsPage: React.FC = () => {
  const [selectedSeason, setSelectedSeason] = useState<'winter' | 'thanksgiving' | 'summer'>('winter');
  const navigate = useNavigate();

  const { onOpenStripe } = useOutletContext<{
    onOpenStripe: (item: { title: string; price: string; subtitle?: string }) => void;
  }>();

  const filteredCamps = CAMPS.filter((c) => c.season === selectedSeason);

  return (
    <div className="flex flex-col gap-gutter-lg pt-gutter-md pb-12">
      
      {/* Seasonal Hero */}
      <section className="rounded-2xl bg-secondary text-secondary-foreground p-gutter-md flex flex-col gap-gutter-sm shadow-sm border border-secondary/20">
        <div className="flex items-center justify-between gap-gutter-md">
          <div className="flex flex-col gap-gutter-xs">
            <Badge variant="accent" className="self-start">
              2026 Camps • Ages 5–12
            </Badge>
            <h1 className="font-headline text-display-lg-mobile text-secondary-foreground font-bold leading-tight">
              Winter & Summer LEGO® Camps
            </h1>
          </div>
          <img
            src="/images/client/camps-visual.png"
            onError={(e) => { e.currentTarget.src = '/images/camps.jpg'; }}
            alt="Bricks 4 Kidz Winter Camps"
            className="w-20 h-20 object-contain rounded-xl bg-white/20 p-1 border-2 border-primary-foreground shrink-0 shadow-sm"
          />
        </div>
        <p className="font-body text-body-sm text-secondary-foreground/90 leading-relaxed">
          Hosted at <strong>215 Gothic Ct Suite 102, Franklin, TN</strong> (Dance Mania Nashville). Choose single-day drop-ins, half-day, or full-week sessions.
        </p>
      </section>

      {/* Camp Season Tabs */}
      <div className="flex items-center gap-gutter-sm overflow-x-auto pb-1" role="group" aria-label="Filter by camp season">
        {[
          { id: 'winter', label: 'Winter Camps' },
          { id: 'thanksgiving', label: 'Thanksgiving' },
          { id: 'summer', label: '2026 Summer' },
        ].map((tab) => {
          const isActive = selectedSeason === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedSeason(tab.id as any)}
              className={`shrink-0 inline-flex items-center px-4 py-1.5 rounded-full font-body text-label-sm transition-all ${
                isActive
                  ? 'bg-primary text-primary-foreground font-bold shadow-sm'
                  : 'bg-card text-muted-foreground border border-border hover:bg-surface-low'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Camp Cards */}
      <section id="camp-list" aria-label="Available Camp Sessions" className="flex flex-col gap-gutter-sm">
        {filteredCamps.map((camp: CampItem) => (
          <Card key={camp.id} className="flex flex-col gap-gutter-sm shadow-sm hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between gap-gutter-sm">
                <Badge variant="secondary">
                  {camp.track}
                </Badge>
                {camp.spotsLeft && (
                  <span className="font-body text-xs text-slate-500 font-medium bg-surface-container px-2.5 py-0.5 rounded-full border border-border">
                    {camp.spotsLeft}
                  </span>
                )}
              </div>
              <CardTitle className="text-title-md leading-snug">{camp.title}</CardTitle>
            </CardHeader>

            <p className="font-body text-body-sm text-muted-foreground">
              {camp.description}
            </p>

            <div className="flex flex-wrap gap-1.5 py-1">
              {camp.themes.map((t, idx) => (
                <span key={idx} className="text-[11px] font-semibold bg-surface-low text-foreground px-2 py-0.5 rounded border border-border">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-1 text-muted-foreground font-body text-body-sm pt-1 border-t border-border">
              <div className="flex items-center gap-1.5">
                <Clock size={15} className="text-primary shrink-0" />
                <span className="tabular-nums">{camp.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={15} className="text-destructive shrink-0" />
                <span>{camp.location}</span>
              </div>
            </div>

            <CardFooter>
              <div className="flex items-baseline gap-1.5 font-body">
                <span className="text-base font-bold text-primary tracking-tight">
                  {camp.price}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  • {camp.age}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/booking')}
                >
                  Configure
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="gap-1.5 shadow-sm"
                  onClick={() =>
                    onOpenStripe({
                      title: camp.title,
                      price: camp.price.includes('$') ? camp.price.split('–')[0].trim() : '$179.00',
                      subtitle: `${camp.track} • ${camp.location}`,
                    })
                  }
                >
                  <Sparkles size={14} />
                  <span>Stripe Pay</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </section>

      {/* Camp Safety Box */}
      <section className="rounded-2xl bg-surface-low border border-border p-gutter-md flex items-start gap-3">
        <ShieldCheck size={24} className="text-secondary shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1">
          <h3 className="font-headline text-title-md text-foreground font-bold">Safe & Certified Environment</h3>
          <p className="font-body text-body-sm text-muted-foreground leading-relaxed">
            Nut-free facility, CPR-certified teachers, low 1:8 counselor ratio, and contactless check-in/check-out system.
          </p>
        </div>
      </section>

    </div>
  );
};
