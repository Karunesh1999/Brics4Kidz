import React, { useState } from 'react';
import { Award, BookOpen, ShieldCheck, Users, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { REVIEWS } from '../data/mockData';

export const AboutPage: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'goals' | 'handbook' | 'careers' | null>(null);
  const [careerSubmitted, setCareerSubmitted] = useState(false);

  return (
    <div className="flex flex-col gap-gutter-lg pt-gutter-md pb-6">
      
      {/* Page Header */}
      <section className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm">
        <img
          src="/images/client/stem-program-kids.png"
          onError={(e) => { e.currentTarget.src = '/images/hero-lego.jpg'; }}
          alt="Bricks 4 Kidz Franklin STEM Program Kids"
          className="w-full h-44 object-cover"
        />
        <div className="p-gutter-md flex flex-col gap-gutter-xs">
          <Badge variant="primary" className="self-start">About Our Franklin Franchise</Badge>
          <h1 className="font-headline text-display-lg-mobile text-foreground font-bold leading-tight">
            We Learn. We Build. We Play.
          </h1>
        </div>
      </section>

      {/* Philosophy & Pillars */}
      <section className="flex flex-col gap-gutter-sm">
        <h2 className="font-headline text-headline-md text-foreground font-bold">
          Our Educational Philosophy
        </h2>
        <div className="grid grid-cols-1 gap-3">
          <Card className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
              <Award size={20} />
            </div>
            <div>
              <h3 className="font-headline text-title-md text-foreground font-bold">Kinesthetic Experiential Learning</h3>
              <p className="font-body text-body-sm text-muted-foreground mt-1">
                Children retain 80% more concepts when they build with their own hands compared to traditional passive screen time.
              </p>
            </div>
          </Card>

          <Card className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 mt-0.5">
              <Users size={20} />
            </div>
            <div>
              <h3 className="font-headline text-title-md text-foreground font-bold">Partner Collaboration</h3>
              <p className="font-body text-body-sm text-muted-foreground mt-1">
                Students work in pairs, alternating between the role of builder and project engineer to learn effective communication and teamwork.
              </p>
            </div>
          </Card>

          <Card className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="font-headline text-title-md text-foreground font-bold">Safety & Nut-Free Policy</h3>
              <p className="font-body text-body-sm text-muted-foreground mt-1">
                All instructors are comprehensively background-checked, CPR trained, and all camp/school spaces adhere strictly to allergy-safe guidelines.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Territory & Facility */}
      <section className="rounded-2xl bg-surface-low border border-border p-gutter-md flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <MapPin size={20} className="text-destructive shrink-0" />
          <h2 className="font-headline text-headline-md text-foreground font-bold">
            Franklin & Nashville Territory
          </h2>
        </div>
        <p className="font-body text-body-sm text-muted-foreground leading-relaxed">
          Our main learning center is conveniently located at <strong>215 Gothic Court Suite 102, Franklin, TN 37067</strong> (inside Dance Mania Nashville). We also partner directly with Williamson County schools, churches, and private residences.
        </p>
        <div className="grid grid-cols-2 gap-2 text-label-sm font-semibold text-foreground pt-1">
          <div className="p-2.5 rounded-lg bg-card border border-border flex items-center justify-center gap-1.5 text-center">
            <img src="/images/client/fcs-partner.webp" alt="Franklin Classical School" className="h-4 w-auto object-contain" />
            <span>Franklin Classical School</span>
          </div>
          <div className="p-2.5 rounded-lg bg-card border border-border text-center">Vine Christian Academy</div>
          <div className="p-2.5 rounded-lg bg-card border border-border text-center">Oak View Elementary</div>
          <div className="p-2.5 rounded-lg bg-card border border-border text-center">Brentwood & Nashville</div>
        </div>

        {/* STEM Accreditation Badges */}
        <div className="flex items-center justify-center gap-4 pt-2 border-t border-border/60">
          <img src="/images/client/stem-accreditation-badge.webp" alt="STEM.org Accredited" className="h-10 w-auto object-contain" />
          <img src="/images/client/stem-bis-badge.webp" alt="Best in STEM" className="h-10 w-auto object-contain" />
        </div>
      </section>

      {/* Policies & Action Sheets */}
      <section className="flex flex-col gap-gutter-sm">
        <h2 className="font-headline text-headline-md text-foreground font-bold">
          Parent Resources & Policies
        </h2>

        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => setActiveModal('goals')}
            className="rounded-xl bg-card border border-border p-4 flex items-center justify-between text-left hover:bg-surface-low transition-colors shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Award size={20} className="text-primary" />
              <div>
                <h3 className="font-headline text-title-md text-foreground font-bold">Our Educational Goals</h3>
                <p className="font-body text-body-sm text-muted-foreground">STEAM literacy, mechanical physics & problem solving</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-primary shrink-0" />
          </button>

          <button
            onClick={() => setActiveModal('handbook')}
            className="rounded-xl bg-card border border-border p-4 flex items-center justify-between text-left hover:bg-surface-low transition-colors shadow-sm"
          >
            <div className="flex items-center gap-3">
              <BookOpen size={20} className="text-secondary" />
              <div>
                <h3 className="font-headline text-title-md text-foreground font-bold">Parent Waiver & Camp Handbook</h3>
                <p className="font-body text-body-sm text-muted-foreground">Drop-off policies, photo releases & medical forms</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-primary shrink-0" />
          </button>

          <button
            onClick={() => setActiveModal('careers')}
            className="rounded-xl bg-card border border-border p-4 flex items-center justify-between text-left hover:bg-surface-low transition-colors shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Users size={20} className="text-destructive" />
              <div>
                <h3 className="font-headline text-title-md text-foreground font-bold">Work With Us (Instructors Wanted)</h3>
                <p className="font-body text-body-sm text-muted-foreground">Join our enthusiastic Franklin teaching team</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-primary shrink-0" />
          </button>
        </div>
      </section>

      {/* Community Testimonials */}
      <section className="flex flex-col gap-gutter-sm">
        <h2 className="font-headline text-headline-md text-foreground font-bold">
          Franklin Parent Feedback
        </h2>
        <div className="flex flex-col gap-3">
          {REVIEWS.slice(4, 7).map((rev) => (
            <Card key={rev.id} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-headline text-title-md text-foreground font-bold">{rev.author}</span>
                <span className="font-body text-label-sm text-secondary font-semibold">{rev.location}</span>
              </div>
              <p className="font-body text-body-sm text-muted-foreground italic leading-relaxed">
                {rev.quote}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Educational Goals Modal */}
      <Modal
        isOpen={activeModal === 'goals'}
        onClose={() => setActiveModal(null)}
        title="Our Educational Goals"
        description="The Bricks 4 Kidz STEAM methodology"
      >
        <div className="flex flex-col gap-3 text-body-sm text-foreground leading-relaxed">
          <p>
            At Bricks 4 Kidz Franklin, we believe that kids learn best when engaging multiple senses through interactive play.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li><strong>Spatial & Mechanical Awareness:</strong> Understanding gears, axles, pulleys, and torque.</li>
            <li><strong>Problem Solving:</strong> Experimenting with different design variations when building motorized models.</li>
            <li><strong>Collaboration:</strong> Working in pairs to foster communication, patience, and team problem-solving.</li>
            <li><strong>Confidence:</strong> Every child leaves having built a working model with their own hands.</li>
          </ul>
        </div>
      </Modal>

      {/* Handbook Modal */}
      <Modal
        isOpen={activeModal === 'handbook'}
        onClose={() => setActiveModal(null)}
        title="Parent Waiver & Handbook"
        description="Safety, drop-off, and health guidelines"
      >
        <div className="flex flex-col gap-3 text-body-sm text-foreground leading-relaxed">
          <p>
            <strong>Drop-off & Pick-up:</strong> Morning check-in begins at 9:20 AM. An authorized photo ID is required for afternoon release.
          </p>
          <p>
            <strong>Nut-Free Zone:</strong> Please pack nut-free lunches and 2 snacks for full-day campers.
          </p>
          <p>
            <strong>Refunds & Changes:</strong> Cancellations made up to 7 days prior to camp receive a 100% credit or refund.
          </p>
        </div>
      </Modal>

      {/* Careers Modal */}
      <Modal
        isOpen={activeModal === 'careers'}
        onClose={() => {
          setActiveModal(null);
          setCareerSubmitted(false);
        }}
        title="Teach with Bricks 4 Kidz"
        description="Part-time STEAM instructors & party hosts wanted"
      >
        {careerSubmitted ? (
          <div className="flex flex-col items-center text-center gap-2 py-4">
            <CheckCircle2 size={36} className="text-secondary" />
            <h4 className="font-headline text-title-md font-bold">Application Received!</h4>
            <p className="font-body text-body-sm text-muted-foreground">
              Our Franklin director will contact you within 24 hours.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setCareerSubmitted(true);
            }}
            className="flex flex-col gap-3"
          >
            <label className="flex flex-col gap-1 text-left">
              <span className="font-body text-label-sm text-foreground font-semibold">Your Name</span>
              <input
                type="text"
                required
                placeholder="Full name"
                className="w-full rounded-lg border border-border bg-card p-2 text-body-sm"
              />
            </label>
            <label className="flex flex-col gap-1 text-left">
              <span className="font-body text-label-sm text-foreground font-semibold">Email / Phone</span>
              <input
                type="text"
                required
                placeholder="email@example.com or phone"
                className="w-full rounded-lg border border-border bg-card p-2 text-body-sm"
              />
            </label>
            <label className="flex flex-col gap-1 text-left">
              <span className="font-body text-label-sm text-foreground font-semibold">Experience with Kids / STEM</span>
              <textarea
                rows={3}
                placeholder="Briefly tell us about your teaching or robotics background..."
                className="w-full rounded-lg border border-border bg-card p-2 text-body-sm"
              />
            </label>
            <Button variant="primary" type="submit" className="w-full mt-2">
              Submit Application
            </Button>
          </form>
        )}
      </Modal>

    </div>
  );
};
