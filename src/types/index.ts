export type ProgramCategory = 'after-school' | 'camps' | 'homeschool' | 'preschool' | 'parties' | 'community';

export interface ScheduleItem {
  id: string;
  category: 'after-school' | 'homeschool' | 'camps';
  categoryLabel: string;
  sessions: string;
  title: string;
  location: string;
  locationId: 'classical' | 'vine' | 'gothic';
  dates: string;
  time: string;
  price: string;
  priceNumber: number;
  age: string;
  spotsLeft: number;
  totalSpots: number;
  description: string;
}

export interface ProgramItem {
  id: string;
  slug: string;
  ageGroup: 'prek' | 'elementary' | 'community';
  ageLabel: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  priceOrNote: string;
  priceNumber?: number;
  ctaText: string;
  iconName: string;
  imageUrl: string;
  features: string[];
  curriculum: {
    weekOrUnit: string;
    title: string;
    description: string;
  }[];
  learningOutcomes: string[];
  recommendedAge: string;
}

export interface CampItem {
  id: string;
  season: 'winter' | 'thanksgiving' | 'summer';
  track: string;
  spotsLeft: string;
  spotsNumber: number;
  title: string;
  time: string;
  location: string;
  price: string;
  priceNumber: number;
  age: string;
  isPopular?: boolean;
  imageUrl: string;
  description: string;
  themes: string[];
}

export interface PartyPackage {
  id: string;
  name: string;
  guests: string;
  guestCount: number;
  duration: string;
  price: string;
  priceNumber: number;
  isPopular?: boolean;
  description: string;
  features: string[];
  themes: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'robotics' | 'engineering' | 'duplo' | 'camps' | 'parties';
  categoryLabel: string;
  ageGroup: string;
  imageUrl: string;
  description: string;
  motorized: boolean;
  tags: string[];
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  quote: string;
  stars: number;
  location: string;
}

export interface FaqItem {
  id: string;
  category: 'general' | 'camps' | 'parties' | 'schools';
  question: string;
  answer: string;
}

export interface LeadItem {
  id: string;
  name: string;
  channel: string;
  inquiry: string;
  status: string;
  statusVariant: 'success' | 'info' | 'warning' | 'destructive';
  details: string;
  amount: string;
  nudged?: boolean;
}

export interface AiChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time?: string;
  actionPayload?: {
    type: 'stripe_checkout';
    title: string;
    amount: string;
    route?: string;
  };
}

export interface BookingFormData {
  serviceType: 'camp' | 'after-school' | 'homeschool' | 'party';
  selectedItemId: string;
  selectedTitle: string;
  selectedPrice: string;
  priceNumber: number;
  location: string;
  preferredDate: string;
  preferredTime: string;
  childName: string;
  childAge: string;
  parentName: string;
  email: string;
  phone: string;
  partyTheme?: string;
  venueAddon?: boolean;
  extraGuests?: number;
  specialNotes?: string;
}
