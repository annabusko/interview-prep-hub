import type React from 'react';

export type SummaryCardProps = Readonly<{
  label: string;
  value: number;
  icon: React.ReactNode;
}>;
