export interface PricingCardType {
  id: string;
  price: number;
  package: string;
  plan: PricingPlan;
  features: string[];
}

export type PricingPlan = "home" | "gym" | "personal";
