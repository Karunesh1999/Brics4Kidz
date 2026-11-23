import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ChevronDown, ChevronUp, MessageSquareQuote } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { FAQS } from '../data/mockData';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Question');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  // FAQ Accordion
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  const toggleFaq = (id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col gap-gutter-lg pt-gutter-md pb-12">
      
      {/* Header */}
      <section className="rounded-2xl bg-card border border-border p-gutter-md flex flex-col gap-gutter-xs shadow-sm">
        <Badge variant="primary" className="self-start">Direct Channels</Badge>
        <h1 className="font-headline text-display-lg-mobile text-foreground font-bold leading-tight">
          Connect With Franklin Team
        </h1>
        <p className="font-body text-body-md text-muted-foreground leading-relaxed">
          Questions about registration, camp rosters, birthday packages, or school partnerships? We're here to help.
        </p>
      </section>

      {/* Quick Action Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <a
          href="tel:6153798800"
          className="rounded-xl bg-card border border-border p-4 flex flex-col items-center text-center gap-2 hover:border-primary transition-all shadow-sm group"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
            <Phone size={20} />
          </div>
          <div>
            <span className="font-headline text-title-md text-foreground font-bold block">Call Us</span>
            <span className="font-body text-body-sm text-primary font-semibold">(615) 379-8800</span>
          </div>
        </a>

        <a
          href="https://wa.me"
          target="_blank"
          rel="noreferrer"
          className="rounded-xl bg-card border border-border p-4 flex flex-col items-center text-center gap-2 hover:border-secondary transition-all shadow-sm group"
        >
          <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
            <MessageSquareQuote size={20} />
          </div>
          <div>
            <span className="font-headline text-title-md text-foreground font-bold block">WhatsApp</span>
            <span className="font-body text-body-sm text-secondary font-semibold">Instant Live Chat</span>
          </div>
        </a>

        <a
          href="mailto:franklin@bricks4kidz.com"
          className="rounded-xl bg-card border border-border p-4 flex flex-col items-center text-center gap-2 hover:border-destructive transition-all shadow-sm group"
        >
          <div className="w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center group-hover:scale-110 transition-transform">
            <Mail size={20} />
          </div>
          <div>
            <span className="font-headline text-title-md text-foreground font-bold block">Email</span>
            <span className="font-body text-body-sm text-destructive font-semibold">franklin@bricks4kidz.com</span>
          </div>
        </a>
      </div>

      {/* Campus Location Card */}
      <section className="rounded-2xl bg-surface-low border border-border p-gutter-md flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <MapPin size={20} className="text-destructive shrink-0" />
          <h2 className="font-headline text-headline-md text-foreground font-bold">
            Franklin Headquarters & Facility
          </h2>
        </div>
        <p className="font-body text-body-sm text-foreground">
          <strong>215 Gothic Court Suite 102, Franklin, TN 37067</strong> (located directly inside Dance Mania Nashville).
        </p>
        <div className="flex items-center gap-2 text-body-sm text-muted-foreground">
          <Clock size={16} className="text-primary shrink-0" />
          <span>Office Hours: Monday – Saturday, 9:00 AM – 5:30 PM CST</span>
        </div>
      </section>

      {/* Contact Form */}
      <section className="rounded-2xl bg-card border border-border p-gutter-md flex flex-col gap-gutter-md shadow-sm">
        <div>
          <h2 className="font-headline text-headline-md text-foreground font-bold">
            Send an Inquiry
          </h2>
          <p className="font-body text-body-sm text-muted-foreground mt-0.5">
            Our Franklin director will follow up with you within 1 business day.
          </p>
        </div>

        {isSent ? (
          <div className="p-5 rounded-xl bg-secondary/10 border border-secondary/30 text-center flex flex-col items-center gap-2 animate-in fade-in">
            <CheckCircle2 size={36} className="text-secondary" />
            <h3 className="font-headline text-title-md text-foreground font-bold">Message Sent!</h3>
            <p className="font-body text-body-sm text-muted-foreground">
              Thank you for reaching out, <strong>{name}</strong>. A copy has been delivered to your email: {email}.
            </p>
            <Button variant="outline" size="sm" onClick={() => setIsSent(false)} className="mt-2">
              Send Another Note
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label className="flex flex-col gap-1 text-left">
              <span className="font-headline text-label-sm text-foreground font-bold">Your Name *</span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full rounded-xl bg-card border border-border p-2.5 font-body text-body-sm text-foreground focus:border-primary focus:ring-1 focus:ring-ring"
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-1 text-left">
                <span className="font-headline text-label-sm text-foreground font-bold">Email Address *</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="parent@example.com"
                  className="w-full rounded-xl bg-card border border-border p-2.5 font-body text-body-sm text-foreground focus:border-primary focus:ring-1 focus:ring-ring"
                />
              </label>

              <label className="flex flex-col gap-1 text-left">
                <span className="font-headline text-label-sm text-foreground font-bold">Phone Number</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(615) 555-0100"
                  className="w-full rounded-xl bg-card border border-border p-2.5 font-body text-body-sm text-foreground focus:border-primary focus:ring-1 focus:ring-ring"
                />
              </label>
            </div>

            <label className="flex flex-col gap-1 text-left">
              <span className="font-headline text-label-sm text-foreground font-bold">Inquiry Topic</span>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-xl bg-card border border-border p-2.5 font-body text-body-sm text-foreground focus:border-primary focus:ring-1 focus:ring-ring"
              >
                <option value="General Question">General Question</option>
                <option value="Winter/Summer Camps">Winter & Summer Camps</option>
                <option value="Birthday Party Booking">Birthday Party Booking</option>
                <option value="School Partnership / PTO">School Partnership / PTO Assembly</option>
                <option value="Special Needs & Adaptations">Special Needs & Accommodations</option>
              </select>
            </label>

            <label className="flex flex-col gap-1 text-left">
              <span className="font-headline text-label-sm text-foreground font-bold">Message Details *</span>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your child's age or specific questions..."
                className="w-full rounded-xl bg-card border border-border p-2.5 font-body text-body-sm text-foreground focus:border-primary focus:ring-1 focus:ring-ring"
              />
            </label>

            <Button variant="primary" size="lg" type="submit" className="w-full gap-2 shadow-md mt-1">
              <Send size={16} />
              <span>Submit Message</span>
            </Button>
          </form>
        )}
      </section>

      {/* Frequently Asked Questions */}
      <section className="flex flex-col gap-gutter-sm">
        <h2 className="font-headline text-headline-md text-foreground font-bold">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-2">
          {FAQS.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <Card
                key={faq.id}
                onClick={() => toggleFaq(faq.id)}
                className="cursor-pointer hover:border-primary/50 transition-colors p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-headline text-title-md text-foreground font-bold">{faq.question}</h3>
                  {isOpen ? (
                    <ChevronUp size={18} className="text-primary shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-muted-foreground shrink-0" />
                  )}
                </div>
                {isOpen && (
                  <p className="font-body text-body-sm text-muted-foreground pt-2.5 mt-2.5 border-t border-border animate-in fade-in leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      </section>

    </div>
  );
};
