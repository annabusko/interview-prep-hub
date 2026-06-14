import type { ReactNode } from "react";
import { currentTheme } from "@/theme";

export const EmptyState = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className={currentTheme.emptyState.container}>
      {children}
    </div>
  );
};
