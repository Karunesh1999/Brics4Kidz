import React, { useState } from 'react';
import { LEADS } from '../data/mockData';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Check, Send, MailCheck, TrendingUp, MessageSquare, Building2, Sparkles, CheckCircle2 } from 'lucide-react';
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

      {/* Workspace Filter Tabs (Zero Cutoff Segmented Control) */}
      <div className="grid grid-cols-3 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 gap-1">
        {[
          { id: 'leads', label: 'Leads', count: leads.length },
          { id: 'schools', label: 'Schools', count: 3 },
          { id: 'marketing', label: 'Campaigns', count: 4 },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-white text-primary shadow-xs border border-primary/20'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                isActive ? 'bg-primary/10 text-primary' : 'bg-slate-200/80 text-slate-500'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Leads & Support */}
      {activeTab === 'leads' && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-headline text-base font-bold text-foreground leading-tight">
                Active AI Conversions
              </h2>
              <p className="font-body text-[11px] text-muted-foreground mt-0.5">
                Real-time automated parent inquiries & Stripe checkouts
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70 text-[11px] font-bold shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Sync</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {leads.map((lead) => {
              const isPaidOrBooked = lead.status === 'Paid' || lead.status === 'Booked';
              const displayAmount = lead.amount.replace('+', '').trim();

              return (
                <Card 
                  key={lead.id} 
                  className="flex flex-col gap-3 p-4 rounded-2xl border border-slate-200/90 bg-white shadow-xs hover:shadow-sm hover:border-primary/40 transition-all"
                >
                  {/* Top Header: Lead Name, Channel Badge & Status */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                        {lead.channel.includes('Instagram') ? (
                          <span className="text-xs font-bold text-pink-600">IG</span>
                        ) : lead.channel.includes('Facebook') ? (
                          <span className="text-xs font-bold text-blue-600">FB</span>
                        ) : lead.channel.includes('Chat') ? (
                          <MessageSquare size={16} className="text-primary" />
                        ) : (
                          <Building2 size={16} className="text-amber-600" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-headline text-sm font-bold text-slate-900 leading-tight">
                          {lead.name}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          via {lead.channel}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div>
                      {lead.status === 'Paid' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 size={12} className="text-emerald-600" /> Paid
                        </span>
                      ) : lead.status === 'Booked' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          <CheckCircle2 size={12} className="text-blue-600" /> Booked
                        </span>
                      ) : lead.status === 'Stripe Sent' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                          <Send size={11} className="text-purple-600" /> Stripe Sent
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          Proposal Pending
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Inquiry Program Pill */}
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs font-semibold text-slate-800">
                    <Sparkles size={13} className="text-primary shrink-0" />
                    <span className="truncate">{lead.inquiry}</span>
                  </div>

                  {/* AI Activity Details */}
                  <p className="text-xs text-slate-600 leading-relaxed pl-0.5">
                    <span className="font-bold text-slate-700">AI Action: </span>
                    {lead.details}
                  </p>

                  {/* Card Footer: Amount & Action */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 mt-0.5">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {isPaidOrBooked ? 'Collected Revenue' : 'Estimated Value'}
                      </span>
                      <span className="font-headline text-base font-extrabold text-primary tracking-tight">
                        {displayAmount}
                      </span>
                    </div>

                    {isPaidOrBooked ? (
                      <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-bold">
                        <Check size={13} className="text-emerald-600" />
                        <span>Receipt Sent</span>
                      </div>
                    ) : (
                      <Button
                        variant={lead.nudged ? 'outline' : 'primary'}
                        size="sm"
                        disabled={lead.nudged}
                        onClick={() => handleNudge(lead.id)}
                        className={`h-9 px-3.5 rounded-xl text-xs font-bold gap-1.5 ${
                          lead.nudged ? 'hover:bg-slate-50' : '!text-white shadow-xs'
                        }`}
                      >
                        {lead.nudged ? (
                          <>
                            <Check size={14} className="text-secondary" />
                            <span>Nudge Sent</span>
                          </>
                        ) : (
                          <>
                            <Send size={13} className="text-white" />
                            <span>Send Nudge</span>
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
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
