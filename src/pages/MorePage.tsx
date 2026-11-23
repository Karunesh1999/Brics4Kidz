import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { 
  Compass, 
  Calendar, 
  PartyPopper, 
  Images, 
  Bot, 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight,
  Clock,
  Users,
  Award,
  Layers,
  TrendingUp,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { PROGRAMS, CAMPS, PARTY_PACKAGES, SCHEDULES, LEADS, GALLERY_ITEMS } from '../data/mockData';

export const MorePage: React.FC = () => {
  const navigate = useNavigate();
  const { onOpenAi } = useOutletContext<{
    onOpenStripe?: (item: { title: string; price: string; subtitle?: string }) => void;
    onOpenAi?: () => void;
  }>() || {};

  // Compute live dashboard metrics
  const totalPrograms = PROGRAMS.length;
  const totalCamps = CAMPS.length;
  const totalPartyPackages = PARTY_PACKAGES.length;
  const totalGallery = GALLERY_ITEMS.length;
  const totalSpotsLeft = SCHEDULES.reduce((acc, s) => acc + s.spotsLeft, 0);

  return (
    <div className="flex flex-col gap-5 pt-3 pb-12 font-body text-foreground">
      
      {/* 2. Key Performance Metrics Grid */}
      <section className="grid grid-cols-2 gap-2.5">
        <div className="rounded-2xl bg-card border border-border p-3.5 shadow-xs flex flex-col gap-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold">Active Programs</span>
            <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Layers size={15} />
            </div>
          </div>
          <span className="font-headline text-2xl font-bold text-primary">
            {totalPrograms} Tracks
          </span>
          <span className="text-[11px] text-muted-foreground">
            Pre-K to 6th Grade
          </span>
        </div>

        <div className="rounded-2xl bg-card border border-border p-3.5 shadow-xs flex flex-col gap-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold">Camp Sessions</span>
            <div className="w-7 h-7 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
              <Calendar size={15} />
            </div>
          </div>
          <span className="font-headline text-2xl font-bold text-secondary">
            {totalCamps} Available
          </span>
          <span className="text-[11px] text-muted-foreground">
            Winter, Break & Summer
          </span>
        </div>

        <div className="rounded-2xl bg-card border border-border p-3.5 shadow-xs flex flex-col gap-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold">Franklin Students</span>
            <div className="w-7 h-7 rounded-lg bg-accent/20 text-accent-foreground flex items-center justify-center">
              <Users size={15} />
            </div>
          </div>
          <span className="font-headline text-2xl font-bold text-foreground">
            1,450+
          </span>
          <span className="text-[11px] text-muted-foreground">
            18 Partner Schools
          </span>
        </div>

        <div className="rounded-2xl bg-card border border-border p-3.5 shadow-xs flex flex-col gap-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-semibold">Community Rating</span>
            <div className="w-7 h-7 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center">
              <Award size={15} />
            </div>
          </div>
          <span className="font-headline text-2xl font-bold text-foreground">
            5.0 ★
          </span>
          <span className="text-[11px] text-muted-foreground">
            100% Satisfaction
          </span>
        </div>
      </section>

      {/* 3. Live Capacity & Enrollment Tracker */}
      <section className="rounded-2xl bg-card border border-border p-4 shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline text-sm font-bold text-foreground">
              Current Session Availability
            </h2>
            <p className="text-xs text-muted-foreground">
              {totalSpotsLeft} total seats remaining across active workshops
            </p>
          </div>
          <Badge variant="primary" className="text-[10px] py-0.5 px-2">
            Live Seats
          </Badge>
        </div>

        <div className="flex flex-col gap-3 pt-1 divide-y divide-border/60">
          {SCHEDULES.slice(0, 4).map((sch) => {
            const filledPercent = Math.round(((sch.totalSpots - sch.spotsLeft) / sch.totalSpots) * 100);
            return (
              <div key={sch.id} className="pt-2.5 first:pt-0 flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-headline font-bold text-foreground truncate">
                      {sch.title}
                    </span>
                    <span className="text-[11px] text-muted-foreground truncate">
                      {sch.location} • {sch.sessions}
                    </span>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-xs font-bold text-primary">
                      {sch.price}
                    </span>
                    <span className={`text-[10px] font-semibold ${
                      sch.spotsLeft <= 3 ? 'text-destructive font-bold' : 'text-slate-500'
                    }`}>
                      {sch.spotsLeft} spots left
                    </span>
                  </div>
                </div>

                {/* Capacity Progress Bar */}
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all ${
                      filledPercent >= 80 ? 'bg-destructive' : filledPercent >= 60 ? 'bg-primary' : 'bg-secondary'
                    }`}
                    style={{ width: `${filledPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/booking')}
          className="w-full mt-1 text-xs font-bold rounded-xl h-9 hover:bg-slate-50"
        >
          <span>View All Schedules & Book</span>
          <ChevronRight size={14} />
        </Button>
      </section>

      {/* 4. Service Programs Directory Hub */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            All Programs & Modules
          </h2>
          <span className="text-[11px] text-primary font-semibold">
            {totalPrograms + totalCamps + totalPartyPackages} Offerings
          </span>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-xs overflow-hidden divide-y divide-border/60">
          {[
            {
              label: 'STEAM Programs',
              description: 'After-school, robotics & preschool tracks',
              meta: `${totalPrograms} Tracks • From $150`,
              to: '/services',
              icon: Compass,
              color: 'text-primary bg-primary/10',
            },
            {
              label: 'Winter & Summer Camps',
              description: 'Holiday drop-ins & summer STEM camps',
              meta: `${totalCamps} Sessions • From $49`,
              to: '/camps',
              icon: Calendar,
              color: 'text-secondary bg-secondary/10',
            },
            {
              label: 'Birthday Parties',
              description: 'Hosted at your home or our Franklin venue',
              meta: `${totalPartyPackages} Packages • $249 & $349`,
              to: '/parties',
              icon: PartyPopper,
              color: 'text-destructive bg-destructive/10',
            },
            {
              label: 'Student LEGO® Gallery',
              description: 'Motorized models, rovers & battlebots',
              meta: `${totalGallery} Featured Builds`,
              to: '/gallery',
              icon: Images,
              color: 'text-primary bg-primary/10',
            },
            {
              label: 'Online Booking & Checkout',
              description: 'Select session, attendee info & instant pay',
              meta: 'Instant Confirmation',
              to: '/booking',
              icon: CreditCard,
              color: 'text-accent-foreground bg-accent/20',
              highlight: true,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.to}
                onClick={() => navigate(item.to)}
                className={`w-full flex items-center justify-between p-3.5 text-left transition-colors hover:bg-slate-50 active:bg-slate-100 ${
                  item.highlight ? 'bg-amber-50/40' : ''
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-headline font-bold text-foreground leading-tight truncate">
                      {item.label}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {item.description}
                    </span>
                    <span className="text-[10px] font-semibold text-primary/90 mt-0.5">
                      {item.meta}
                    </span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-400 shrink-0 ml-2" />
              </button>
            );
          })}
        </div>
      </section>

      {/* 5. Recent Activity / Inquiries Snapshot */}
      <section className="rounded-2xl bg-card border border-border p-4 shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-secondary" />
            <h2 className="font-headline text-sm font-bold text-foreground">
              Recent Enrollment Activity
            </h2>
          </div>
          <Badge variant="secondary" className="text-[10px] py-0.5 px-2">
            Automated CRM
          </Badge>
        </div>

        <div className="flex flex-col gap-2.5 divide-y divide-border/60">
          {LEADS.slice(0, 3).map((lead) => (
            <div key={lead.id} className="pt-2 first:pt-0 flex items-center justify-between gap-2">
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-headline font-bold text-foreground truncate">
                  {lead.name}
                </span>
                <span className="text-[11px] text-muted-foreground truncate">
                  {lead.inquiry}
                </span>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  lead.statusVariant === 'success' 
                    ? 'bg-secondary/15 text-secondary' 
                    : lead.statusVariant === 'info'
                    ? 'bg-primary/15 text-primary'
                    : 'bg-amber-500/15 text-amber-700'
                }`}>
                  {lead.status}
                </span>
                <span className="text-[10px] text-slate-500 font-medium mt-0.5">
                  {lead.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Ask BrickBot AI Concierge */}
      {onOpenAi && (
        <button
          onClick={onOpenAi}
          className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-4 shadow-sm flex items-center justify-between transition-transform active:scale-98"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Bot size={22} className="text-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-headline text-sm font-bold leading-tight">
                Ask BrickBot AI Concierge
              </span>
              <span className="text-xs text-white/80">
                Instant answers on programs, camp dates & birthday slots
              </span>
            </div>
          </div>
          <ChevronRight size={18} className="text-white/80 shrink-0" />
        </button>
      )}

      {/* 7. Center Location & Operational Info */}
      <section className="flex flex-col gap-2">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
          Franklin Facility & Contact
        </h2>

        <Card className="p-4 flex flex-col gap-3 text-xs bg-slate-50/80 border border-slate-200">
          <div className="flex items-start gap-2.5">
            <MapPin size={16} className="text-destructive shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-800 block text-xs">Learning Center Address</span>
              <span className="text-slate-600">215 Gothic Court Suite 102, Franklin, TN 37067 (Dance Mania Nashville)</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200/80">
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-primary shrink-0" />
              <a href="tel:6153798800" className="font-semibold text-primary hover:underline">
                (615) 379-8800
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-secondary shrink-0" />
              <a href="mailto:franklin@bricks4kidz.com" className="font-semibold text-secondary hover:underline">
                franklin@bricks4kidz.com
              </a>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="text-slate-400 shrink-0" />
              <span>Mon–Sat: 9:00 AM – 5:30 PM</span>
            </div>
            <span className="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
              Sunday Parties Open
            </span>
          </div>
        </Card>
      </section>

    </div>
  );
};