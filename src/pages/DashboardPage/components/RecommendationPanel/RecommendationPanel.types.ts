import type React from 'react';

export type RecommendationPanelProps = Readonly<{
  icon: React.ReactNode;
  label: string;
  heading: string;
  description: string;
  actions: React.ReactNode;
  rightSlot: React.ReactNode;
}>;
