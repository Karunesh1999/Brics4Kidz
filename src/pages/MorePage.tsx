import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { 
  Home, 
  Compass, 
  Calendar, 
  PartyPopper, 
  Images, 
  Info, 
  PhoneCall, 
  Bot, 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight,
  Clock
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export const MorePage: React.FC = () => {
  const navigate = useNavigate();
  const { onOpenAi } = useOutletContext<{
    onOpenStripe?: (item: { title: string; price: string; subtitle?: string }) => void;
    onOpenAi?: () => void;
  }>() || {};

  const menuSections = [
    {
      title: 'Programs & Activities',
      items: [
        {
          label: 'Home',
          description: 'Back to the main overview',
          to: '/',
          icon: Home,
          color: 'text-primary bg-primary/10',
        },
        {
          label: 'STEAM Programs',
          description: 'After-school, robotics & preschool enrichment',
          to: '/services',
          icon: Compass,
          color: 'text-primary bg-primary/10',
        },
        {
          label: 'Winter & Summer Camps',
          description: 'Seasonal holiday and summer break camps',
          to: '/camps',
          icon: Calendar,
          color: 'text-secondary bg-secondary/10',
        },
        {
          label: 'Birthday Parties',
          description: 'Deluxe & premium motorized LEGO celebrations',
          to: '/parties',
          icon: PartyPopper,
          color: 'text-destructive bg-destructive/10',
        },
        {
          label: 'Student LEGO® Gallery',
          description: 'Explore motorized student builds & models',
          to: '/gallery',
          icon: Images,
          color: 'text-primary bg-primary/10',
        },
        {
          label: 'Online Booking & Checkout',
          description: 'Instant enrollment & credit card checkout',
          to: '/booking',
          icon: Sparkles,
          color: 'text-accent-foreground bg-accent/20',
          highlight: true,
        },
      ],
    },
    {
      title: 'About & Information',
      items: [
        {
          label: 'About Us & Safety',
          description: 'Our philosophy, instructors & safety standards',
          to: '/about',
          icon: Info,
          color: 'text-secondary bg-secondary/10',
        },
        {
          label: 'Contact & Location',
          description: 'Center address, phone & direct inquiry form',
          to: '/contact',
          icon: PhoneCall,
          color: 'text-primary bg-primary/10',
        },
        {
          label: 'Team AI & Growth Hub',
          description: 'Automated CRM, email campaigns & growth analytics',
          to: '/ai-hub',
          icon: Bot,
          color: 'text-secondary bg-secondary/10',
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-5 pt-3 pb-8 font-body">
      
      {/* Brand Header Card */}
      <Card className="p-4 flex items-center justify-between gap-3 bg-gradient-to-r from-blue-50/70 via-white to-emerald-50/50 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-2xl p-1.5 shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
            <img
              src="/images/b4k-official-logo.svg"
              alt="Bricks 4 Kidz"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <h1 className="font-headline text-base font-bold text-slate-900 leading-tight">
                Bricks 4 Kidz
              </h1>
              <Badge variant="primary" className="text-[10px] py-0 px-1.5">
                Franklin, TN
              </Badge>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Williamson County STEAM Enrichment
            </p>
          </div>
        </div>
      </Card>

      {/* Menu Groups */}
      {menuSections.map((section) => (
        <div key={section.title} className="flex flex-col gap-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            {section.title}
          </h2>

          <div className="bg-card rounded-2xl border border-border shadow-xs overflow-hidden divide-y divide-border/60">
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.to}
                  onClick={() => navigate(item.to)}
                  className={`w-full flex items-center justify-between p-3.5 text-left transition-colors hover:bg-slate-50 active:bg-slate-100 ${
                    item.highlight ? 'bg-amber-50/40' : ''
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                      <Icon size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-sm font-headline font-bold leading-tight ${
                        item.highlight ? 'text-primary' : 'text-slate-800'
                      }`}>
                        {item.label}
                      </span>
                      <span className="text-xs text-slate-400 font-normal leading-snug">
                        {item.description}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-400 shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Ask BrickBot AI Trigger Card */}
      {onOpenAi && (
        <button
          onClick={onOpenAi}
          className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-4 shadow-sm flex items-center justify-between transition-transform active:scale-98"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Bot size={22} className="text-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-headline text-sm font-bold leading-tight">
                Ask BrickBot AI Concierge
              </span>
              <span className="text-xs text-white/80">
                Instant program answers, booking & camp schedules
              </span>
            </div>
          </div>
          <ChevronRight size={18} className="text-white/80 shrink-0" />
        </button>
      )}

      {/* Direct Contact & Center Location Card */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
          Franklin Center Info
        </h2>

        <Card className="p-4 flex flex-col gap-3 text-xs text-slate-600 bg-slate-50/70 border border-slate-200">
          <div className="flex items-start gap-2.5">
            <MapPin size={16} className="text-destructive shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-800 block">Learning Center Address</span>
              <span>215 Gothic Court Suite 102, Franklin, TN 37067 (Dance Mania Nashville)</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200/80">
            <div className="flex items-center gap-2">
              <Phone size={15} className="text-primary shrink-0" />
              <a href="tel:6153798800" className="font-semibold text-primary hover:underline">
                (615) 379-8800
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={15} className="text-secondary shrink-0" />
              <a href="mailto:franklin@bricks4kidz.com" className="font-semibold text-secondary hover:underline">
                Email Center
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-slate-200/80 text-[11px] text-slate-500">
            <Clock size={14} className="shrink-0 text-slate-400" />
            <span>Mon–Sat: 9:00 AM – 5:30 PM • Sunday Parties By Reservation</span>
          </div>
        </Card>
      </div>

    </div>
  );
};
