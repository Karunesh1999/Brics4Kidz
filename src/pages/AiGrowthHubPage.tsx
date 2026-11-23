import React, { useState } from 'react';
import { LEADS } from '../data/mockData';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Check, Send, MailCheck, TrendingUp, RefreshCw } from 'lucide-react';
import type { LeadItem } from '../types';

export const AiGrowthHubPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'leads' | 'schools' | 'marketing'>('leads');
  const [leads, setLeads] = useState<LeadItem[]>(LEADS);
  const [proposalSent, setProposalSent] = useState(false);

  const handleNudge = (id: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, nudged: true, status: 'Nudge Sent', statusVariant: 'info' } : l))
    );
  };

  return (
    <div className="flex flex-col gap-gutter-lg pt-gutter-md pb-12">
      
      {/* Top Header Card */}
      <div className="rounded-2xl bg-primary text-primary-foreground p-gutter-md flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-destructive text-destructive-foreground flex flex-col items-center justify-center font-bold text-xs">
            <span>B4K</span>
            <span className="font-mono text-[9px]">AI</span>
          </div>
          <div>
            <h1 className="font-headline text-title-md font-bold leading-tight">Bricks 4 Kidz AI</h1>
            <p className="font-body text-label-sm text-primary-foreground/90">FRANKLIN GROWTH HUB</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-label-sm font-bold shadow-sm">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>Auto-Pilot ON</span>
        </div>
      </div>

      {/* Conversion Metrics */}
      <section aria-label="AI Conversion Summary" className="grid grid-cols-2 gap-gutter-sm">
        <div className="rounded-2xl bg-card border border-border p-gutter-md flex flex-col gap-gutter-xs shadow-sm">
          <span className="font-body text-label-sm text-muted-foreground font-medium">Inquiries Converted</span>
          <span className="font-mono text-headline-lg text-primary font-bold tabular-nums">34</span>
          <span className="font-body text-body-sm text-secondary font-semibold flex items-center gap-1">
            <TrendingUp size={14} />
            +28% via Stripe
          </span>
        </div>
        <div className="rounded-2xl bg-card border border-border p-gutter-md flex flex-col gap-gutter-xs shadow-sm">
          <span className="font-body text-label-sm text-muted-foreground font-medium">AI Auto-Replies</span>
          <span className="font-mono text-headline-lg text-secondary font-bold tabular-nums">142</span>
          <span className="font-body text-body-sm text-muted-foreground font-medium">Web, FB & IG</span>
        </div>
      </section>

      {/* Workspace Filter Tabs */}
      <div className="flex items-center gap-gutter-sm overflow-x-auto pb-1" role="group" aria-label="AI Hub Sections">
        {[
          { id: 'leads', label: 'Leads & Support' },
          { id: 'schools', label: 'School Partners' },
          { id: 'marketing', label: 'Campaigns & Apps' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`shrink-0 px-4 py-1.5 rounded-full font-body text-label-sm transition-all ${
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

      {/* Tab 1: Leads & Support */}
      {activeTab === 'leads' && (
        <section className="flex flex-col gap-gutter-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-headline-md text-foreground font-bold">
              Active AI Conversions
            </h2>
            <span className="text-xs text-secondary font-bold flex items-center gap-1">
              <RefreshCw size={12} className="animate-spin" />
              Live Sync
            </span>
          </div>

          {leads.map((lead) => (
            <Card key={lead.id} className="flex flex-col gap-gutter-sm shadow-sm hover:border-primary transition-colors">
              <div className="flex items-center justify-between gap-gutter-sm">
                <div>
                  <h3 className="font-headline text-title-md text-foreground font-bold">
                    {lead.name} • {lead.channel}
                  </h3>
                  <p className="font-body text-body-sm text-muted-foreground">{lead.inquiry}</p>
                </div>
                <Badge variant={lead.statusVariant === 'success' ? 'secondary' : lead.statusVariant === 'warning' ? 'accent' : 'primary'}>
                  {lead.status}
                </Badge>
              </div>

              <p className="font-body text-body-md text-foreground/90">
                {lead.details}
              </p>

              <div className="flex items-center justify-between pt-gutter-sm border-t border-border">
                <span className="font-mono text-mono-md text-primary font-bold tabular-nums">
                  {lead.amount}
                </span>
                {lead.status !== 'Paid' && lead.status !== 'Booked' ? (
                  <Button
                    variant={lead.nudged ? 'outline' : 'primary'}
                    size="sm"
                    disabled={lead.nudged}
                    onClick={() => handleNudge(lead.id)}
                    className="gap-1.5"
                  >
                    {lead.nudged ? <Check size={14} className="text-secondary" /> : <Send size={14} />}
                    <span>{lead.nudged ? 'Nudge Sent' : 'Send Nudge'}</span>
                  </Button>
                ) : (
                  <span className="font-body text-label-sm text-secondary font-semibold flex items-center gap-1">
                    <Check size={14} />
                    Receipt Sent
                  </span>
                )}
              </div>
            </Card>
          ))}
        </section>
      )}

      {/* Tab 2: School Partnerships */}
      {activeTab === 'schools' && (
        <section className="flex flex-col gap-gutter-sm">
          <h2 className="font-headline text-headline-md text-foreground font-bold">
            School Partnerships
          </h2>

          <Card className="flex flex-col gap-gutter-xs shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-headline text-title-md text-foreground font-bold">
                Franklin Classical School
              </h3>
              <Badge variant="secondary">Active Partner</Badge>
            </div>
            <p className="font-body text-body-sm text-muted-foreground">
              Fall 2026 Junior Robotics • 18/20 enrolled ($150 / student)
            </p>
          </Card>

          <Card className="flex flex-col gap-gutter-xs shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-headline text-title-md text-foreground font-bold">
                Vine Christian Academy (Lifepoint)
              </h3>
              <Badge variant="primary">Homeschool Partner</Badge>
            </div>
            <p className="font-body text-body-sm text-muted-foreground">
              Friday LEGO® STEM Junior Engineer • 15 Sessions active
            </p>
          </Card>

          <Card className="flex flex-col gap-gutter-sm shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-headline text-title-md text-foreground font-bold">
                Oak View Elementary PTO
              </h3>
              <Badge variant="accent">Proposal Pending</Badge>
            </div>
            <p className="font-body text-body-sm text-muted-foreground">
              Spring 2027 8-week after-school enrichment proposal drafted by BrickBot AI.
            </p>
            <div className="pt-2 border-t border-border flex justify-end">
              <Button
                variant={proposalSent ? 'outline' : 'primary'}
                size="sm"
                disabled={proposalSent}
                onClick={() => setProposalSent(true)}
                className="gap-1.5"
              >
                {proposalSent ? <Check size={14} className="text-secondary" /> : <MailCheck size={14} />}
                <span>{proposalSent ? 'Follow-Up Scheduled' : 'Dispatch AI Proposal'}</span>
              </Button>
            </div>
          </Card>
        </section>
      )}

      {/* Tab 3: Marketing & Connected Apps */}
      {activeTab === 'marketing' && (
        <section className="flex flex-col gap-gutter-sm">
          <h2 className="font-headline text-headline-md text-foreground font-bold">
            Campaigns & Connected Apps
          </h2>

          <Card className="flex flex-col gap-gutter-sm shadow-sm">
            <h3 className="font-headline text-title-md text-foreground font-bold">
              Email Follow-Up Sequence
            </h3>
            <p className="font-body text-body-sm text-muted-foreground">
              "Winter Camp Early-Bird" • 412 parents • 48% open rate • 19 direct Stripe bookings.
            </p>
          </Card>

          <div className="grid grid-cols-2 gap-gutter-sm">
            <div className="rounded-xl bg-card border border-border p-gutter-sm flex items-center justify-between shadow-sm">
              <span className="font-headline text-body-sm text-foreground font-bold">Website Chat</span>
              <Badge variant="secondary">Connected</Badge>
            </div>
            <div className="rounded-xl bg-card border border-border p-gutter-sm flex items-center justify-between shadow-sm">
              <span className="font-headline text-body-sm text-foreground font-bold">Facebook</span>
              <Badge variant="secondary">Connected</Badge>
            </div>
            <div className="rounded-xl bg-card border border-border p-gutter-sm flex items-center justify-between shadow-sm">
              <span className="font-headline text-body-sm text-foreground font-bold">Instagram DM</span>
              <Badge variant="secondary">Connected</Badge>
            </div>
            <div className="rounded-xl bg-card border border-border p-gutter-sm flex items-center justify-between shadow-sm">
              <span className="font-headline text-body-sm text-foreground font-bold">Stripe</span>
              <Badge variant="primary">Live Mode</Badge>
            </div>
          </div>
        </section>
      )}

    </div>
  );
};
