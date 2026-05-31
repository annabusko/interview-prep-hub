import { getSurfaceClassName } from "@/theme";
import type { SurfaceProps } from "./Surface.types";

export const Surface = ({
  variant = "card",
  radius = "3xl",
  padding = "md",
  className,
  children,
  ...rest
}: SurfaceProps) => {
  return (
    <div
      className={getSurfaceClassName({ variant, radius, padding, className })}
      {...rest}
    >
      {children}
    </div>
  );
};
