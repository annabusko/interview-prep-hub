import type { HTMLAttributes, ReactNode } from "react";
import type { SurfaceVariant, SurfaceRadius, SurfacePadding } from "@/theme";

export type SurfaceProps = Readonly<
  HTMLAttributes<HTMLDivElement> & {
    variant?: SurfaceVariant;
    radius?: SurfaceRadius;
    padding?: SurfacePadding;
    children: ReactNode;
  }
>;
