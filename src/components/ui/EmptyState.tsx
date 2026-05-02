
import type { ReactNode } from 'react';

export function EmptyState({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
      {children}
    </div>
  );
}
