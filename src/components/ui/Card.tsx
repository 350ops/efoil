"use client";

import type { ReactNode, HTMLAttributes } from "react";
import styles from "./card.module.css";

interface BaseProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ children, className, style, ...rest }: BaseProps) {
  return (
    <div className={`${styles.card} ${className ?? ""}`} style={style} {...rest}>
      {children}
    </div>
  );
}

export function CardPill({ children, className, style, ...rest }: BaseProps) {
  return (
    <div className={`${styles.cardPill} ${className ?? ""}`} style={style} {...rest}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...rest }: BaseProps) {
  return (
    <div className={`${styles.header} ${className ?? ""}`} {...rest}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...rest }: BaseProps) {
  return (
    <h3 className={`${styles.title} ${className ?? ""}`} {...rest}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className, ...rest }: BaseProps) {
  return (
    <p className={`${styles.description} ${className ?? ""}`} {...rest}>
      {children}
    </p>
  );
}

export function CardContent({ children, className, ...rest }: BaseProps) {
  return (
    <div className={`${styles.content} ${className ?? ""}`} {...rest}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...rest }: BaseProps) {
  return (
    <div className={`${styles.footer} ${className ?? ""}`} {...rest}>
      {children}
    </div>
  );
}

export function CardSeparator() {
  return <hr className={styles.separator} />;
}
