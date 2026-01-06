export interface PricingCardType {
  id: string;
  price: number;
  package: string;
  plan: PricingPlan;
  features: string[];
  duration: number; // minutes
}

export type PricingPlan = "home" | "gym" | "personal";
