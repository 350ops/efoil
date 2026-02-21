"use client";

import { DayPicker, type DayPickerProps } from "react-day-picker";
import "react-day-picker/style.css";
import "./calendar.css";

type CalendarProps = DayPickerProps & {
  className?: string;
};

export function Calendar({ className, ...props }: CalendarProps) {
  return (
    <div className={`rdp-calendar-wrapper ${className ?? ""}`}>
      <DayPicker {...props} />
    </div>
  );
}
