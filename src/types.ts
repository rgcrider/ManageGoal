export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logoName: string; // references lucide icon or graphic
  colorClass: string; // tailwind color configuration classes
  badgeColorClass: string;
  priceMonthly: number;
  features: string[];
  benefits: string[];
  overview: string;
  rating: number;
  reviewCount: number;
  highlightedMetric: { label: string; value: string };
  faq: { question: string; answer: string }[];
  testimonials: { name: string; role: string; company: string; text: string; rating: number }[];
  screenshots: { title: string; description: string; visualType: "crm" | "email" | "invoice" | "social" | "tasks" | "analytics" }[];
}

export interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  isPopular?: boolean;
  features: string[];
  ctaText: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  position: string;
  review: string;
  rating: number;
  avatarSeed: string; // for high-res premium seed placeholders
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "all" | "billing" | "cancellation" | "security" | "product";
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatarSeed: string;
  };
  date: string;
  readTime: string;
}

export interface CartItem {
  product: Product;
  billingCycle: "monthly" | "yearly";
  price: number;
}

export interface SupportTicket {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "idle" | "submitting" | "success" | "error";
  ticketId?: string;
}
