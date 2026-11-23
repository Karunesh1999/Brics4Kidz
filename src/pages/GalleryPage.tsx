import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/mockData';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Wrench, Zap } from 'lucide-react';
import type { GalleryItem } from '../types';

export const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="flex flex-col gap-gutter-lg pt-gutter-md pb-12">
      
      {/* Header */}
      <section className="rounded-2xl bg-card border border-border p-gutter-md flex flex-col gap-gutter-xs shadow-sm">
        <Badge variant="primary" className="self-start">Student Creations</Badge>
        <h1 className="font-headline text-display-lg-mobile text-foreground font-bold leading-tight">
          Student LEGO® Showcase
        </h1>
        <p className="font-body text-body-md text-muted-foreground leading-relaxed">
          Explore actual motorized engineering builds, robotics inventions, and holiday camp models crafted by young Franklin innovators.
        </p>
      </section>

      {/* Filter Tabs */}
      <div className="flex items-center gap-gutter-sm overflow-x-auto pb-1" role="group" aria-label="Filter gallery">
        {[
          { id: 'all', label: 'All Builds' },
          { id: 'engineering', label: 'Mechanical STEM' },
          { id: 'robotics', label: 'Robotics' },
          { id: 'camps', label: 'Camp Projects' },
          { id: 'parties', label: 'Birthday Derbies' },
          { id: 'duplo', label: 'Pre-K DUPLO' },
        ].map((tab) => {
          const isActive = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`shrink-0 inline-flex items-center px-4 py-1.5 rounded-full font-body text-label-sm transition-all ${
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

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter-sm">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            variant="interactive"
            onClick={() => setActiveItem(item)}
            className="flex flex-col overflow-hidden p-0 group"
          >
            <div className="relative h-44 w-full overflow-hidden bg-surface-low">
              <img
                src={item.imageUrl}
                onError={(e) => { e.currentTarget.src = '/images/hero-lego.jpg'; }}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {item.motorized && (
                <div className="absolute top-2.5 left-2.5 bg-secondary text-secondary-foreground text-[11px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
                  <Zap size={11} fill="currentColor" />
                  <span>Motorized Build</span>
                </div>
              )}
              <div className="absolute top-2.5 right-2.5 bg-card/90 backdrop-blur-xs text-foreground text-[11px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
                {item.ageGroup}
              </div>
            </div>

            <div className="p-4 flex flex-col gap-2">
              <span className="text-xs font-semibold text-primary">{item.categoryLabel}</span>
              <h3 className="font-headline text-title-md text-foreground font-bold group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="font-body text-body-sm text-muted-foreground line-clamp-2">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-1 pt-2 border-t border-border mt-auto">
                {item.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] font-semibold text-muted-foreground bg-surface-container px-2 py-0.5 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Inspect Item Modal */}
      <Modal
        isOpen={!!activeItem}
        onClose={() => setActiveItem(null)}
        title={activeItem?.title}
        description={`${activeItem?.categoryLabel} • ${activeItem?.ageGroup}`}
      >
        {activeItem && (
          <div className="flex flex-col gap-4">
            <img
              src={activeItem.imageUrl}
              onError={(e) => { e.currentTarget.src = '/images/hero-lego.jpg'; }}
              alt={activeItem.title}
              className="w-full h-52 object-cover rounded-xl border border-border"
            />
            <p className="font-body text-body-md text-foreground/90 leading-relaxed">
              {activeItem.description}
            </p>

            <div className="rounded-xl bg-surface-low p-3.5 border border-border flex flex-col gap-2">
              <h4 className="font-headline text-title-md text-foreground font-bold flex items-center gap-1.5">
                <Wrench size={16} className="text-primary" />
                <span>Engineering & Science Principles:</span>
              </h4>
              <ul className="list-disc pl-5 text-body-sm text-muted-foreground space-y-1">
                <li>Motorized torque reduction with crown & spur gear trains</li>
                <li>Structural cross-bracing for balance and rotational stability</li>
                <li>Hands-on calibration of axle friction and mechanical efficiency</li>
              </ul>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="primary" onClick={() => setActiveItem(null)}>
                Close Preview
              </Button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
