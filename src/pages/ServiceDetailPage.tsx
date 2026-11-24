import React from 'react';
import { useParams, Link, useNavigate, useOutletContext } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Calendar } from 'lucide-react';
import { PROGRAMS } from '../data/mockData';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { onOpenStripe } = useOutletContext<{
    onOpenStripe: (item: { title: string; price: string; subtitle?: string }) => void;
  }>();

  const program = PROGRAMS.find((p) => p.slug === slug);

  if (!program) {
    return (
      <div className="py-16 text-center flex flex-col items-center gap-4">
        <h2 className="font-headline text-headline-md font-bold">Program Not Found</h2>
        <p className="text-body-sm text-muted-foreground">The requested STEAM program could not be located.</p>
        <Button variant="primary" onClick={() => navigate('/services')}>
          Return to Programs
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-gutter-lg pt-gutter-md pb-12">
      
      {/* Back button */}
      <Link
        to="/services"
        className="inline-flex items-center gap-1.5 text-label-sm font-headline font-semibold text-primary hover:underline"
      >
        <ArrowLeft size={16} />
        <span>Back to All Programs</span>
      </Link>

      {/* Hero Header */}
      <section className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm">
        <div className="w-full bg-slate-50 flex items-center justify-center overflow-hidden">
          <img
            src={program.imageUrl}
            onError={(e) => { e.currentTarget.src = '/images/hero-lego.jpg'; }}
            alt={program.title}
            className="w-full h-auto block"
          />
        </div>
        <div className="p-gutter-md flex flex-col gap-gutter-sm">
          <div className="flex items-center justify-between gap-2">
            <Badge variant="primary">{program.ageLabel}</Badge>
            <span className="font-body text-body-sm font-bold text-primary tracking-tight">
              {program.priceOrNote}
            </span>
          </div>

          <h1 className="font-headline text-title-lg text-foreground font-bold leading-tight">
            {program.title}
          </h1>

          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              className="w-full font-bold rounded-xl shadow-xs py-3 text-body-sm"
              onClick={() =>
                onOpenStripe({
                  title: program.title,
                  price: program.priceNumber ? `$${program.priceNumber}.00` : '$150.00',
                  subtitle: program.subtitle,
                })
              }
            >
              <span>Enroll Now • {program.priceOrNote}</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Overview & What is Included */}
      <section className="flex flex-col gap-gutter-sm">
        <h2 className="font-headline text-headline-md text-foreground font-bold">
          Program Overview
        </h2>
        <Card className="p-4 sm:p-5 rounded-2xl border border-border/80 shadow-sm flex flex-col gap-4">
          <div className="bg-primary/5 rounded-xl p-3.5 sm:p-4 border border-primary/15">
            <p className="font-body text-sm sm:text-base text-foreground/90 font-medium leading-relaxed">
              {program.longDescription}
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <h3 className="font-headline text-sm sm:text-base text-foreground font-bold">What's Included:</h3>
            <div className="grid grid-cols-1 gap-2">
              {program.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/85">
                  <CheckCircle2 size={16} className="text-secondary shrink-0 mt-0.5" />
                  <span className="leading-snug">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>

      {/* Curriculum Breakdown */}
      <section className="flex flex-col gap-gutter-sm">
        <h2 className="font-headline text-headline-md text-foreground font-bold">
          Weekly Curriculum & Project Highlights
        </h2>
        <div className="flex flex-col gap-2.5">
          {program.curriculum.map((c, idx) => (
            <Card key={idx} className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-label-sm text-primary font-bold">{c.weekOrUnit}</span>
                <span className="font-body text-label-sm text-muted-foreground">Motorized Build</span>
              </div>
              <h3 className="font-headline text-title-md text-foreground font-bold">{c.title}</h3>
            </Card>
          ))}
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="rounded-2xl bg-surface-low border border-border p-gutter-md flex flex-col gap-3">
        <h2 className="font-headline text-headline-md text-foreground font-bold">
          Core Learning Objectives
        </h2>
        <div className="flex flex-col gap-2">
          {program.learningOutcomes.map((outcome, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-body-sm text-foreground">
              <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
              <span>{outcome}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Action Card */}
      <div className="rounded-2xl bg-card border border-border p-4 shadow-sm flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col">
            <h3 className="font-headline text-title-md text-foreground font-bold">Ready to Join?</h3>
            <span className="font-body text-xs text-muted-foreground mt-0.5">{program.recommendedAge}</span>
          </div>
          <span className="font-body text-sm font-bold text-primary tracking-tight text-right shrink-0 whitespace-nowrap">
            {program.priceOrNote}
          </span>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={() =>
            onOpenStripe({
              title: program.title,
              price: program.priceNumber ? `$${program.priceNumber}.00` : '$150.00',
              subtitle: program.subtitle,
            })
          }
          className="w-full h-11 font-bold rounded-xl shadow-xs text-body-sm gap-2"
        >
          <Calendar size={17} />
          <span>Enroll Now</span>
        </Button>
      </div>

    </div>
  );
};
