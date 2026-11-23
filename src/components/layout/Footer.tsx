import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-low border-t border-border py-8 px-page-margin mt-12 flex flex-col gap-6 text-muted-foreground">
      {/* Brand & Mission */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-destructive text-destructive-foreground font-headline font-bold flex items-center justify-center text-xs">
            B4K
          </div>
          <span className="font-headline text-title-md text-foreground font-bold">
            Bricks 4 Kidz Franklin
          </span>
        </div>
        <p className="font-body text-body-sm leading-relaxed">
          Inspiring the next generation of engineers, architects, and innovators across Franklin, Brentwood, and Nashville through experiential LEGO® STEAM enrichment.
        </p>
      </div>

      {/* Quick Navigation Links */}
      <div className="grid grid-cols-2 gap-4 text-body-sm font-headline">
        <div className="flex flex-col gap-2">
          <span className="text-foreground font-bold text-label-sm uppercase tracking-wider">Explore</span>
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
          <Link to="/services" className="hover:text-primary transition-colors">STEAM Programs</Link>
          <Link to="/camps" className="hover:text-primary transition-colors">Winter & Summer Camps</Link>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-foreground font-bold text-label-sm uppercase tracking-wider">Connect</span>
          <Link to="/parties" className="hover:text-primary transition-colors">Birthday Parties</Link>
          <Link to="/gallery" className="hover:text-primary transition-colors">Student Gallery</Link>
          <Link to="/booking" className="hover:text-primary transition-colors">Book Online</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
          <Link to="/ai-hub" className="hover:text-primary transition-colors">Team AI Hub</Link>
        </div>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col gap-2.5 pt-4 border-t border-border text-body-sm">
        <div className="flex items-start gap-2.5">
          <MapPin size={16} className="text-destructive shrink-0 mt-0.5" />
          <span>215 Gothic Court Suite 102, Franklin, TN 37067 (Dance Mania Nashville)</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Phone size={16} className="text-primary shrink-0" />
          <a href="tel:6153798800" className="hover:underline">(615) 379-8800</a>
        </div>
        <div className="flex items-center gap-2.5">
          <Mail size={16} className="text-secondary shrink-0" />
          <a href="mailto:franklin@bricks4kidz.com" className="hover:underline">franklin@bricks4kidz.com</a>
        </div>
        <div className="flex items-center gap-2.5">
          <Clock size={16} className="text-muted-foreground shrink-0" />
          <span>Mon–Sat: 9:00 AM – 5:30 PM • Sunday Parties By Reservation</span>
        </div>
      </div>

      {/* Social Links & Copyright */}
      <div className="pt-4 border-t border-border flex flex-col items-center gap-2 text-center text-xs">
        <div className="flex items-center gap-4 text-sm font-semibold">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-primary hover:underline">
            Facebook
          </a>
          <span>•</span>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-destructive hover:underline">
            Instagram
          </a>
          <span>•</span>
          <a href="https://wa.me" target="_blank" rel="noreferrer" className="text-secondary hover:underline">
            WhatsApp
          </a>
        </div>
        <p className="flex items-center gap-1 mt-1">
          <span>We Learn. We Build. We Play.</span>
          <Heart size={12} className="text-destructive fill-destructive" />
        </p>
        <p>© 2026 Bricks 4 Kidz Franklin – Nashville, TN. All rights reserved.</p>
      </div>
    </footer>
  );
};
