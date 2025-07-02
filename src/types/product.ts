export interface Buyer {
  id: string;
  name: string;
  avatar?: string;
  location: string;
  purchaseDate: string;
  quantity: number;
  isVerified: boolean;
}

export interface PricingTier {
  minQuantity: number;
  maxQuantity?: number;
  unitPrice: number;
  totalPrice: number;
  savings?: number; // Économies par rapport au prix de base
  savingsPercentage?: number;
}

export interface ProductPricing {
  basePrice: number; // Prix unitaire en Chine (Yuan)
  basePriceFCFA: number; // Prix converti en FCFA
  shippingCost: number; // Frais d'expédition par unité
  serviceFee: number; // Commission service par unité
  customsFees: number; // Frais de douane par unité
  totalPrice: number; // Prix final TTC par unité
  currency: string;
  exchangeRate: number; // Taux de change Yuan -> FCFA
  tiers?: PricingTier[]; // Paliers de dégressivité
}

export interface ProductSpecification {
  name: string;
  value: string;
  category?:
    | "dimension"
    | "weight"
    | "material"
    | "color"
    | "performance"
    | "other";
}

export interface FeaturedProduct {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  images: string[];
  pricing: ProductPricing;
  buyers: Buyer[];
  category: string;
  tags: string[];
  originalUrl?: string;
  specifications: ProductSpecification[];
  inStock: boolean;
  stockQuantity?: number;
  minOrderQuantity: number;
  maxOrderQuantity?: number;
  estimatedDelivery: string; // ex: "15-25 jours"
  weight?: number; // en kg
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: "cm" | "m";
  };
  isPopular: boolean;
  isTrending: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CalculatorStep {
  value: number;
  label: string;
}

export interface CalculatorResult {
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  shippingTotal: number;
  serviceTotal: number;
  customsTotal: number;
  grandTotal: number;
  savings: number;
  savingsPercentage: number;
  applicableTier?: PricingTier;
  breakdown: {
    products: number;
    shipping: number;
    service: number;
    customs: number;
  };
}

export interface ProductFormData {
  productId?: string;
  productName?: string;
  productUrl?: string;
  quantity?: number;
  specifications?: string;
  urgency?: "normal" | "urgent" | "express";
  budget?: number;
  notes?: string;
}

// Enum pour les catégories de produits
export enum ProductCategory {
  ELECTRONICS = "electronics",
  FASHION = "fashion",
  HOME_GARDEN = "home-garden",
  SPORTS = "sports",
  AUTOMOTIVE = "automotive",
  BEAUTY = "beauty",
  TOOLS = "tools",
  TOYS = "toys",
  INDUSTRIAL = "industrial",
  OTHER = "other",
}

// Enum pour les statuts de stock
export enum StockStatus {
  IN_STOCK = "in-stock",
  LOW_STOCK = "low-stock",
  OUT_OF_STOCK = "out-of-stock",
  PRE_ORDER = "pre-order",
}

// Constantes utiles
export const CALCULATOR_STEPS: CalculatorStep[] = [
  { value: 1, label: "1" },
  { value: 10, label: "10" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
  { value: 500, label: "500" },
  { value: 1000, label: "1000" },
];

export const DEFAULT_CURRENCY = "FCFA";
export const DEFAULT_EXCHANGE_RATE = 85; // 1 Yuan = 85 FCFA (exemple)

// Types pour les événements du calculateur
export interface CalculatorEvent {
  type: "quantity_change" | "step_change" | "calculate" | "reset";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

// Interface pour la configuration du carousel
export interface CarouselConfig {
  slidesToShow: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  autoplay: boolean;
  autoplayDelay: number;
  loop: boolean;
  dragFree: boolean;
}
