import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { School, Bot, Blocks, Trees, Users, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
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
          className="w-full h-40 object-cover"
        />
        <div className="p-gutter-md flex flex-col gap-gutter-sm">
          <Badge variant="primary" className="self-start">
            Ages 3–13+ • Franklin & Nashville
          </Badge>
          <h1 className="font-headline text-display-lg-mobile text-foreground font-bold leading-tight">
            Our STEAM Programs
          </h1>
          <p className="font-body text-body-md text-muted-foreground text-pretty">
            Hands-on LEGO® engineering, robotics, coding, and enrichment programs designed for schools, homeschoolers, camps, and community groups.
          </p>
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

      {/* Program Directory */}
      <section aria-label="Program List" className="flex flex-col gap-gutter-sm">
        {filteredPrograms.map((prog: ProgramItem) => (
          <Card key={prog.id} className="flex flex-col gap-gutter-sm shadow-sm hover:border-primary transition-colors">
            <CardHeader className="flex flex-row items-start justify-between gap-gutter-sm">
              <div className="flex flex-col gap-gutter-xs">
                <Badge variant={prog.ageGroup === 'elementary' ? 'primary' : prog.ageGroup === 'prek' ? 'destructive' : 'secondary'} className="self-start">
                  {prog.ageLabel}
                </Badge>
                <CardTitle className="text-title-md">{prog.title}</CardTitle>
              </div>
              <div className="p-2 rounded-xl bg-surface-low border border-border">
                {getIcon(prog.iconName)}
              </div>
            </CardHeader>

            <CardContent>
              <p className="font-body text-body-md text-muted-foreground">
                {prog.description}
              </p>
            </CardContent>

            <CardFooter>
              <span className="font-mono text-mono-md text-primary font-bold tabular-nums">
                {prog.priceOrNote}
              </span>
              <div className="flex items-center gap-2">
                <Link
                  to={`/services/${prog.slug}`}
                  className="font-headline text-label-sm text-primary hover:underline font-bold px-2 py-1"
                >
                  Learn More
                </Link>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/booking')}
                >
                  Enroll
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </section>

      {/* School Partnership CTA */}
      <section className="rounded-2xl bg-secondary text-secondary-foreground p-gutter-md flex flex-col gap-gutter-sm shadow-sm border border-secondary/20">
        <h2 className="font-headline text-headline-md text-secondary-foreground font-bold">
          Bring Bricks 4 Kidz to Your School
        </h2>
        <p className="font-body text-body-sm text-secondary-foreground/90 leading-relaxed">
          Administrators & PTOs: request a turnkey after-school enrichment proposal or STEM assembly for your Franklin/Nashville campus.
        </p>
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
