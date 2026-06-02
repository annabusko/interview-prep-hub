import type { ReactNode } from "react";
import { EMPTY_STATE_CLASS } from "@/theme";

export const EmptyState = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className={EMPTY_STATE_CLASS}>
      {children}
    </div>
  );
};
