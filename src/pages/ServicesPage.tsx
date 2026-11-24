import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { School, Bot, Blocks, Trees, Users, ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { PROGRAMS } from '../data/mockData';
import type { ProgramItem } from '../types';

export const ServicesPage: React.FC = () => {
  const [selectedAge, setSelectedAge] = useState<'all' | 'prek' | 'elementary' | 'community'>('all');
  const navigate = useNavigate();

  const filteredPrograms = PROGRAMS.filter((p) => {
    if (selectedAge === 'all') return true;
    return p.ageGroup === selectedAge;
  });

  const getIcon = (name: string) => {
    switch (name) {
      case 'GraduationCap': return <School size={22} className="text-primary" />;
      case 'Bot': return <Bot size={22} className="text-secondary" />;
      case 'Blocks': return <Blocks size={22} className="text-destructive" />;
      case 'Trees': return <Trees size={22} className="text-secondary" />;
      case 'Users': return <Users size={22} className="text-primary" />;
      default: return <School size={22} />;
    }
  };

  return (
    <div className="flex flex-col gap-gutter-lg pt-gutter-md pb-6">
      
      {/* Page Header & Hero */}
      <section className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm">
        <img
          src="/images/client/after-school-class.png"
          onError={(e) => { e.currentTarget.src = '/images/after-school.jpg'; }}
          alt="Bricks 4 Kidz Official LEGO Enrichment Class"
          className="w-full h-auto block"
        />
        <div className="p-gutter-md flex flex-col gap-gutter-sm">
          <Badge variant="primary" className="self-start">
            Ages 3–13+ • Franklin & Nashville
          </Badge>
          <h1 className="font-headline text-display-lg-mobile text-foreground font-bold leading-tight">
            Our STEAM Programs
          </h1>
        </div>
      </section>

      {/* Age Filter Chips */}
      <div className="flex items-center gap-gutter-sm overflow-x-auto pb-1" role="group" aria-label="Filter programs by age">
        {[
          { id: 'all', label: 'All Ages' },
          { id: 'prek', label: 'Pre-School (3–5)' },
          { id: 'elementary', label: 'Ages 5–12' },
          { id: 'community', label: 'Scouts & Seniors' },
        ].map((chip) => {
          const isActive = selectedAge === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => setSelectedAge(chip.id as any)}
              className={`shrink-0 inline-flex items-center px-4 py-1.5 rounded-full font-body text-label-sm transition-all ${
                isActive
                  ? 'bg-primary text-primary-foreground font-bold shadow-sm'
                  : 'bg-card text-muted-foreground border border-border hover:bg-surface-low'
              }`}
            >
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>

      {/* Program Directory (Attractive & Balanced Redesign) */}
      <section aria-label="Program List" className="flex flex-col gap-3">
        {filteredPrograms.map((prog: ProgramItem) => (
          <div
            key={prog.id}
            className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs hover:border-primary/50 hover:shadow-sm transition-all flex flex-col gap-3 group"
          >
            {/* Top Row: Icon + Age Badge & Program Title */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${
                    prog.ageGroup === 'elementary'
                      ? 'bg-primary/10 border-primary/20 text-primary'
                      : prog.ageGroup === 'prek'
                      ? 'bg-destructive/10 border-destructive/20 text-destructive'
                      : 'bg-secondary/10 border-secondary/20 text-secondary'
                  }`}
                >
                  {getIcon(prog.iconName)}
                </div>

                <div className="flex flex-col gap-0.5">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md inline-block self-start ${
                      prog.ageGroup === 'elementary'
                        ? 'bg-blue-50 text-blue-700 border border-blue-100'
                        : prog.ageGroup === 'prek'
                        ? 'bg-rose-50 text-rose-700 border border-rose-100'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-100'
                    }`}
                  >
                    {prog.ageLabel}
                  </span>
                  <Link to={`/services/${prog.slug}`}>
                    <h3 className="font-headline text-base font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors">
                      {prog.title}
                    </h3>
                  </Link>
                </div>
              </div>

              <Link
                to={`/services/${prog.slug}`}
                className="text-slate-400 group-hover:text-primary transition-colors p-1"
                aria-label={`View details for ${prog.title}`}
              >
                <ChevronRight size={18} />
              </Link>
            </div>

            {/* Feature Highlights (Clean Micro-bullets) */}
            {prog.features && prog.features.length > 0 && (
              <div className="flex flex-col gap-1.5 py-1 px-1">
                {prog.features.slice(0, 2).map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom Row: Tuition Price & Clean Actions (Standard Touch-Friendly Size) */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-1 gap-2">
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider leading-none mb-0.5">
                  Tuition
                </span>
                <span className="font-headline text-sm font-extrabold text-primary tracking-tight leading-snug truncate">
                  {prog.priceOrNote}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to={`/services/${prog.slug}`}
                  className="h-10 px-4 rounded-xl border border-slate-200 bg-card hover:bg-slate-50 text-xs sm:text-sm font-semibold text-slate-700 transition-all active:scale-[0.98] flex items-center justify-center whitespace-nowrap shadow-xs"
                >
                  Learn More
                </Link>
                <button
                  type="button"
                  onClick={() => navigate('/booking')}
                  className="h-10 px-5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold transition-all shadow-sm active:scale-[0.98] cursor-pointer flex items-center justify-center whitespace-nowrap"
                >
                  Enroll
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* School Partnership CTA */}
      <section className="rounded-2xl bg-secondary text-secondary-foreground p-gutter-md flex flex-col gap-gutter-sm shadow-sm border border-secondary/20">
        <h2 className="font-headline text-headline-md text-secondary-foreground font-bold">
          Bring Bricks 4 Kidz to Your School
        </h2>
        <Button
          variant="accent"
          size="md"
          className="self-start gap-2 shadow-sm font-bold"
          onClick={() => navigate('/contact')}
        >
          <span>Start School Partnership</span>
          <ArrowRight size={16} />
        </Button>
      </section>

    </div>
  );
};
