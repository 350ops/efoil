"use client";

import type { ReactNode } from "react";
import styles from "./tabs.module.css";

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  activeValue?: string;
  onSelect?: (value: string) => void;
}

export function Tabs({ value, onValueChange, children }: TabsProps) {
  const enhancedChildren = Array.isArray(children) ? children : [children];
  return (
    <div className={styles.list}>
      {enhancedChildren.map((child) => {
        if (child && typeof child === "object" && "props" in child) {
          return {
            ...child,
            props: {
              ...child.props,
              activeValue: value,
              onSelect: onValueChange,
            },
          };
        }
        return child;
      })}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  activeValue,
  onSelect,
}: TabsTriggerProps) {
  return (
    <button
      type="button"
      className={styles.trigger}
      data-active={activeValue === value}
      onClick={() => onSelect?.(value)}
    >
      {children}
    </button>
  );
}
