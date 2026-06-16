/**
 * Interview Prep Hub content pack — the single entry point for all product content.
 *
 * Pages, hooks, and selectors should import categories/topics/questions from here,
 * not from the raw data files. Swapping this file (or pointing to a different pack)
 * is the only change needed to adapt the platform to a new product domain.
 */
import { categories } from "@/data/categories";
import { topics } from "@/data/topics";
import { questions } from "@/data/questions";
import type { ContentPack } from "./contentPack.types";

export const interviewPrepContentPack: ContentPack = {
  categories,
  topics,
  questions,
};

// Named re-exports for convenient destructured imports in consumers
export { categories, topics, questions };
