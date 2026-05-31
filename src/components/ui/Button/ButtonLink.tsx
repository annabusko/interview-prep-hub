import { Link } from "react-router-dom";
import { getButtonClassName } from "@/theme";
import type { ButtonLinkProps } from "./Button.types";

export const ButtonLink = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonLinkProps) => {
  return (
    <Link
      className={getButtonClassName({ variant, size, className })}
      {...rest}
    >
      {children}
    </Link>
  );
};
