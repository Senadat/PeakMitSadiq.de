export interface PricingCardType {
  id: string;
  price: number | string;
  package: string;
  plan: PricingPlan;
  features: string[];
  duration: number; // minutes
}

export type PricingPlan = "home" | "gym" | "personal";
