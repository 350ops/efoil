"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import styles from "./input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: "default" | "lg";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputSize = "default", ...props }, ref) => {
    const cls = inputSize === "lg" ? styles.inputLg : styles.input;
    return (
      <input
        ref={ref}
        className={`${cls} ${className ?? ""}`}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export function Label({
  children,
  htmlFor,
  className,
}: {
  children: ReactNode;
  htmlFor?: string;
  className?: string;
}) {
  return (
    <label htmlFor={htmlFor} className={`${styles.label} ${className ?? ""}`}>
      {children}
    </label>
  );
}

export function FieldGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`${styles.fieldGroup} ${className ?? ""}`}>{children}</div>
  );
}

export function Field({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`${styles.field} ${className ?? ""}`}>{children}</div>
  );
}
