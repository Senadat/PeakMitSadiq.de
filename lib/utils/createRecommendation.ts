import { RecommendationProps } from "@/components/recommendations/content";
import { HeroFormData } from "@/types/hero";
import { RECOMMENDATIONS } from "../data/recommendationsMap";

export function createRecommendation(
  formData: HeroFormData,
): RecommendationProps | null {
  const goal = formData.a;
  const ageGroup = formData.c;

  if (!goal || !ageGroup) return null;

  const recommendation = RECOMMENDATIONS[goal]?.[ageGroup];
  if (!recommendation) return null;

  return {
    goal,
    age_group: ageGroup,
    ...recommendation,
  };
}
