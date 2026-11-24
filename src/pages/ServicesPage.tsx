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
      case 'GraduationCap': return <School size={24} className="text-primary" />;
      case 'Bot': return <Bot size={24} className="text-secondary" />;
      case 'Blocks': return <Blocks size={24} className="text-destructive" />;
      case 'Trees': return <Trees size={24} className="text-secondary" />;
      case 'Users': return <Users size={24} className="text-primary" />;
      default: return <School size={24} />;
    }
  };

  return (
    <div className="flex flex-col gap-gutter-lg pt-gutter-md pb-24">
      
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

      {/* Program Directory (Spacious, Attractive & Modern Card Design) */}
      <section aria-label="Program List" className="flex flex-col gap-5">
        {filteredPrograms.map((prog: ProgramItem) => (
          <div
            key={prog.id}
            className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col gap-4 group"
          >
            {/* Top Row: Icon + Age Badge & Program Title */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                    prog.ageGroup === 'elementary'
                      ? 'bg-primary/10 border-primary/20 text-primary'
                      : prog.ageGroup === 'prek'
                      ? 'bg-destructive/10 border-destructive/20 text-destructive'
                      : 'bg-secondary/10 border-secondary/20 text-secondary'
                  }`}
                >
                  {getIcon(prog.iconName)}
                </div>

                <div className="flex flex-col gap-1">
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full inline-block self-start ${
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
                    <h3 className="font-headline text-lg sm:text-xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                      {prog.title}
                    </h3>
                  </Link>
                </div>
              </div>

              <Link
                to={`/services/${prog.slug}`}
                className="text-muted-foreground group-hover:text-primary transition-colors p-1 shrink-0"
                aria-label={`View details for ${prog.title}`}
              >
                <ChevronRight size={22} />
              </Link>
            </div>

            {/* Feature Highlights */}
            {prog.features && prog.features.length > 0 && (
              <div className="flex flex-col gap-2.5 bg-surface-low/80 rounded-xl p-3.5 sm:p-4 border border-border/60">
                {prog.features.slice(0, 2).map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5 text-sm text-foreground/85">
                    <div className="w-2 h-2 rounded-full bg-secondary shrink-0 mt-1.5" />
                    <span className="leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tuition Price Bar */}
            <div className="flex items-center justify-between bg-primary/5 rounded-xl px-4 py-2.5 border border-primary/15">
              <span className="text-xs uppercase font-bold text-muted-foreground tracking-wider">
                Tuition
              </span>
              <span className="font-headline text-base sm:text-lg font-bold text-primary tracking-tight">
                {prog.priceOrNote}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-0.5">
              <Link
                to={`/services/${prog.slug}`}
                className="h-11 rounded-xl border border-border bg-card hover:bg-surface-low text-sm font-semibold text-foreground transition-all active:scale-[0.98] flex items-center justify-center whitespace-nowrap shadow-xs"
              >
                Learn More
              </Link>
              <button
                type="button"
                onClick={() => navigate('/booking')}
                className="h-11 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-bold transition-all shadow-sm active:scale-[0.98] cursor-pointer flex items-center justify-center whitespace-nowrap"
              >
                Enroll
              </button>
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
