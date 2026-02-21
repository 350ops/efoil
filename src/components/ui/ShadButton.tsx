"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import styles from "./shadbutton.module.css";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "default" | "lg";

interface ShadButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const variantClass: Record<Variant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  ghost: styles.ghost,
};

const sizeClass: Record<Size, string> = {
  sm: styles.sm,
  default: "",
  lg: styles.lg,
};

export const ShadButton = forwardRef<HTMLButtonElement, ShadButtonProps>(
  ({ variant = "primary", size = "default", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={`${variantClass[variant]} ${sizeClass[size]} ${className ?? ""}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
ShadButton.displayName = "ShadButton";
