import { getButtonClassName } from "@/theme";
import type { ButtonProps } from "./Button.types";

export const Button = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={getButtonClassName({ variant, size, className })}
      {...rest}
    >
      {children}
    </button>
  );
};
