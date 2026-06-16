import type { Category, Question, Topic } from "@/domain/models";

/**
 * Describes a complete set of product content — categories, topics, and questions.
 *
 * Swap the ContentPack implementation to adapt the platform to a different product
 * (e.g. Language Learning Hub, System Design Prep) without touching any pages or hooks.
 */
export type ContentPack = {
  readonly categories: readonly Category[];
  readonly topics: readonly Topic[];
  readonly questions: readonly Question[];
};
