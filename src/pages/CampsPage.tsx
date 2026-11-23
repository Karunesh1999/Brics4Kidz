import React, { useState } from 'react';
import { CAMPS } from '../data/mockData';
import { Badge } from '../components/ui/Badge';
import { MapPin, Clock } from 'lucide-react';
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
      </section>

      {/* Camp Season Tabs (Responsive Zero-Cutoff Control) */}
      <div className="grid grid-cols-3 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 gap-1">
        {[
          { id: 'winter', label: 'Winter Camps' },
          { id: 'thanksgiving', label: 'Thanksgiving' },
          { id: 'summer', label: '2026 Summer' },
        ].map((tab) => {
          const isActive = selectedSeason === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedSeason(tab.id as any)}
              className={`py-2 px-1 rounded-xl text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                isActive
                  ? 'bg-white text-secondary shadow-xs border border-secondary/20'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Camp Cards (Minimalist & Fully Responsive Layout) */}
      <section id="camp-list" aria-label="Available Camp Sessions" className="flex flex-col gap-2.5">
        {filteredCamps.map((camp: CampItem) => (
          <div
            key={camp.id}
            className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-xs hover:border-secondary/40 hover:shadow-sm transition-all flex flex-col gap-2"
          >
            {/* Row 1: Track Badge & Availability */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100">
                {camp.track}
              </span>
              {camp.spotsLeft && (
                <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                  {camp.spotsLeft}
                </span>
              )}
            </div>

            {/* Row 2: Title */}
            <h3 className="font-headline text-sm font-bold text-slate-900 leading-snug">
              {camp.title}
            </h3>

            {/* Row 3: Theme chips */}
            <div className="flex flex-wrap gap-1">
              {camp.themes.map((t, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-medium bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200/60"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Row 4: Meta details (Time & Location) */}
            <div className="flex flex-col gap-1 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Clock size={13} className="shrink-0" />
                <span className="truncate">{camp.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={13} className="text-destructive shrink-0" />
                <span className="truncate">{camp.location}</span>
              </div>
            </div>

            {/* Row 5: Price, Age & Actions (Fully Responsive 2-tier layout) */}
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 mt-0.5">
              <div className="flex items-baseline gap-1.5 font-body">
                <span className="font-headline text-base font-extrabold text-slate-900 tracking-tight">
                  {camp.price}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  • Ages {camp.age}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 w-full">
                <button
                  type="button"
                  onClick={() => navigate('/booking')}
                  className="h-8.5 px-3 rounded-xl border border-slate-200 bg-card hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center"
                >
                  Configure
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onOpenStripe({
                      title: camp.title,
                      price: camp.price.includes('$') ? camp.price.split('–')[0].trim() : '$179.00',
                      subtitle: `${camp.track} • ${camp.location}`,
                    })
                  }
                  className="h-8.5 px-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shadow-xs active:scale-[0.98] cursor-pointer flex items-center justify-center whitespace-nowrap"
                >
                  Stripe Pay
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

    </div>
  );
};
