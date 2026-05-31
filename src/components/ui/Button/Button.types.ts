import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { ButtonVariant, ButtonSize } from "@/theme";
import type { LinkProps } from "react-router-dom";

export type ButtonProps = Readonly<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children: ReactNode;
  }
>;

export type ButtonLinkProps = Readonly<
  Omit<LinkProps, "className"> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    children: ReactNode;
  }
>;
