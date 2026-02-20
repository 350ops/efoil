"use client";

import { useState, useCallback, useRef } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────

type SelectionMode = "pickup" | "return" | null;

interface RentalSelection {
  pickupDate: Date | null;
  pickupTime: string;
  returnDate: Date | null;
  returnTime: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const TIME_SLOTS = [
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00",
];

function formatTime(t: string) {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const display = h % 12 === 0 ? 12 : h % 12;
  return `${display}:${m.toString().padStart(2, "0")} ${ampm}`;
}

function formatDate(d: Date | null) {
  if (!d) return null;
  return `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}, ${d.getFullYear()}`;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function isInRange(day: Date, start: Date | null, end: Date | null) {
  if (!start || !end) return false;
  return day > start && day < end;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

// ─── Sub-components ──────────────────────────────────────────────────────────

interface CalendarProps {
  viewYear: number;
  viewMonth: number;
  pickupDate: Date | null;
  returnDate: Date | null;
  mode: SelectionMode;
  onDayClick: (d: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

function Calendar({
  viewYear,
  viewMonth,
  pickupDate,
  returnDate,
  mode,
  onDayClick,
  onPrevMonth,
  onNextMonth,
}: CalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const cells: Array<Date | null> = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(viewYear, viewMonth, d));
  }

  return (
    <div style={{ width: "100%" }}>
      {/* Month nav */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "20px",
      }}>
        <button
          type="button"
          onClick={onPrevMonth}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--neutral-on-background-weak)",
            padding: "6px 10px",
            borderRadius: "8px",
            fontSize: "18px",
            lineHeight: 1,
            transition: "color 0.2s, background 0.2s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color = "var(--brand-on-background-strong)";
            (e.currentTarget as HTMLElement).style.background = "var(--brand-alpha-weak)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color = "var(--neutral-on-background-weak)";
            (e.currentTarget as HTMLElement).style.background = "none";
          }}
        >
          ‹
        </button>
        <span style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 600,
          fontSize: "15px",
          color: "var(--neutral-on-background-strong)",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}>
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          onClick={onNextMonth}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--neutral-on-background-weak)",
            padding: "6px 10px",
            borderRadius: "8px",
            fontSize: "18px",
            lineHeight: 1,
            transition: "color 0.2s, background 0.2s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color = "var(--brand-on-background-strong)";
            (e.currentTarget as HTMLElement).style.background = "var(--brand-alpha-weak)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color = "var(--neutral-on-background-weak)";
            (e.currentTarget as HTMLElement).style.background = "none";
          }}
        >
          ›
        </button>
      </div>

      {/* Day headers */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        marginBottom: "8px",
        gap: "2px",
      }}>
        {DAYS.map(d => (
          <div key={d} style={{
            textAlign: "center",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: "var(--neutral-on-background-weak)",
            padding: "4px 0",
            textTransform: "uppercase",
          }}>
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "2px",
      }}>
        {cells.map((day, idx) => {
          if (!day) {
            return <div key={`empty-${idx}`} />;
          }

          const isPast = day < today;
          const isPickup = pickupDate && isSameDay(day, pickupDate);
          const isReturn = returnDate && isSameDay(day, returnDate);
          const inRange = isInRange(day, pickupDate, returnDate);
          const isToday = isSameDay(day, today);
          const isSelected = isPickup || isReturn;

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={isPast}
              onClick={() => !isPast && onDayClick(day)}
              style={{
                position: "relative",
                border: "none",
                borderRadius: isSelected ? "50%" : "6px",
                width: "100%",
                aspectRatio: "1",
                cursor: isPast ? "not-allowed" : "pointer",
                fontSize: "13px",
                fontWeight: isSelected ? 700 : isToday ? 600 : 400,
                fontFamily: "var(--font-body)",
                transition: "all 0.15s ease",
                color: isSelected
                  ? "var(--brand-on-solid-strong)"
                  : isPast
                  ? "var(--neutral-on-background-weak)"
                  : inRange
                  ? "var(--brand-on-background-strong)"
                  : isToday
                  ? "var(--brand-on-background-strong)"
                  : "var(--neutral-on-background-strong)",
                background: isSelected
                  ? "var(--brand-solid-strong)"
                  : inRange
                  ? "var(--brand-alpha-weak)"
                  : "transparent",
                outline: isToday && !isSelected ? "1px solid var(--brand-alpha-medium)" : "none",
                opacity: isPast ? 0.3 : 1,
              }}
              onMouseEnter={e => {
                if (!isPast && !isSelected) {
                  (e.currentTarget as HTMLElement).style.background = "var(--brand-alpha-weak)";
                  (e.currentTarget as HTMLElement).style.color = "var(--brand-on-background-strong)";
                }
              }}
              onMouseLeave={e => {
                if (!isPast && !isSelected) {
                  (e.currentTarget as HTMLElement).style.background = inRange ? "var(--brand-alpha-weak)" : "transparent";
                  (e.currentTarget as HTMLElement).style.color = inRange ? "var(--brand-on-background-strong)" : "var(--neutral-on-background-strong)";
                }
              }}
            >
              {day.getDate()}
              {isPickup && (
                <span style={{
                  position: "absolute",
                  bottom: "2px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: "var(--brand-on-solid-strong)",
                  opacity: 0.7,
                }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Time Picker ─────────────────────────────────────────────────────────────

interface TimePickerProps {
  label: string;
  value: string;
  onChange: (t: string) => void;
}

function TimePicker({ label, value, onChange }: TimePickerProps) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--neutral-on-background-weak)",
        marginBottom: "10px",
      }}>
        {label}
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "4px",
        maxHeight: "200px",
        overflowY: "auto",
        paddingRight: "4px",
      }}
        className="time-scroll"
      >
        {TIME_SLOTS.map(slot => {
          const isSelected = value === slot;
          return (
            <button
              key={slot}
              type="button"
              onClick={() => onChange(slot)}
              style={{
                border: isSelected
                  ? "1px solid var(--brand-solid-strong)"
                  : "1px solid var(--neutral-alpha-weak)",
                borderRadius: "8px",
                padding: "6px 4px",
                cursor: "pointer",
                fontSize: "12px",
                fontFamily: "var(--font-code)",
                fontWeight: isSelected ? 700 : 400,
                color: isSelected
                  ? "var(--brand-on-solid-strong)"
                  : "var(--neutral-on-background-medium)",
                background: isSelected
                  ? "var(--brand-solid-strong)"
                  : "var(--neutral-alpha-weak)",
                transition: "all 0.15s ease",
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => {
                if (!isSelected) {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--brand-alpha-medium)";
                  (e.currentTarget as HTMLElement).style.color = "var(--brand-on-background-strong)";
                }
              }}
              onMouseLeave={e => {
                if (!isSelected) {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--neutral-alpha-weak)";
                  (e.currentTarget as HTMLElement).style.color = "var(--neutral-on-background-medium)";
                }
              }}
            >
              {formatTime(slot)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Pill / Summary card ──────────────────────────────────────────────────────

interface LegPillProps {
  label: string;
  icon: string;
  date: Date | null;
  time: string;
  active: boolean;
  onClick: () => void;
}

function LegPill({ label, icon, date, time, active, onClick }: LegPillProps) {
  const filled = !!date;
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        flex: 1,
        background: active
          ? "var(--brand-alpha-weak)"
          : filled
          ? "var(--neutral-alpha-weak)"
          : "transparent",
        border: active
          ? "1.5px solid var(--brand-solid-strong)"
          : "1.5px solid var(--neutral-alpha-medium)",
        borderRadius: "14px",
        padding: "14px 18px",
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.2s ease",
        minWidth: 0,
      }}
      onMouseEnter={e => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--brand-alpha-medium)";
          (e.currentTarget as HTMLElement).style.background = "var(--brand-alpha-weak)";
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--neutral-alpha-medium)";
          (e.currentTarget as HTMLElement).style.background = filled ? "var(--neutral-alpha-weak)" : "transparent";
        }
      }}
    >
      <div style={{
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: active ? "var(--brand-on-background-strong)" : "var(--neutral-on-background-weak)",
        marginBottom: "6px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}>
        <span style={{ fontSize: "14px" }}>{icon}</span>
        {label}
      </div>
      {filled ? (
        <>
          <div style={{
            fontSize: "15px",
            fontWeight: 700,
            color: "var(--neutral-on-background-strong)",
            fontFamily: "var(--font-heading)",
            marginBottom: "2px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>
            {formatDate(date)}
          </div>
          <div style={{
            fontSize: "12px",
            color: time ? "var(--brand-on-background-strong)" : "var(--neutral-on-background-weak)",
            fontFamily: "var(--font-code)",
          }}>
            {time ? formatTime(time) : "No time set"}
          </div>
        </>
      ) : (
        <div style={{
          fontSize: "14px",
          color: "var(--neutral-on-background-weak)",
          fontStyle: "italic",
        }}>
          Select date
        </div>
      )}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RentalDatePicker() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [selection, setSelection] = useState<RentalSelection>({
    pickupDate: null,
    pickupTime: "09:00",
    returnDate: null,
    returnTime: "17:00",
  });

  const [mode, setMode] = useState<SelectionMode>("pickup");
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const panelRef = useRef<HTMLDivElement>(null);

  const handleDayClick = useCallback((day: Date) => {
    if (mode === "pickup") {
      setSelection(prev => ({
        ...prev,
        pickupDate: day,
        // Reset return if it's before pickup
        returnDate: prev.returnDate && prev.returnDate <= day ? null : prev.returnDate,
      }));
      setMode("return");
    } else if (mode === "return") {
      if (selection.pickupDate && day <= selection.pickupDate) {
        // If clicked before pickup, swap to set as new pickup
        setSelection(prev => ({ ...prev, pickupDate: day, returnDate: null }));
        setMode("return");
      } else {
        setSelection(prev => ({ ...prev, returnDate: day }));
        setMode(null);
      }
    }
  }, [mode, selection.pickupDate]);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(y => y - 1);
    } else {
      setViewMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(y => y + 1);
    } else {
      setViewMonth(m => m + 1);
    }
  };

  const isComplete = selection.pickupDate && selection.returnDate &&
    selection.pickupTime && selection.returnTime;

  const rentalDays = selection.pickupDate && selection.returnDate
    ? Math.ceil((selection.returnDate.getTime() - selection.pickupDate.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const handleBook = () => {
    if (!isComplete) return;
    const params = new URLSearchParams({
      pickupDate: selection.pickupDate!.toISOString().split("T")[0],
      pickupTime: selection.pickupTime,
      returnDate: selection.returnDate!.toISOString().split("T")[0],
      returnTime: selection.returnTime,
    });
    window.location.href = `/book/location?${params.toString()}`;
  };

  return (
    <div style={{ width: "100%" }}>
      <style>{`
        .time-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .time-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .time-scroll::-webkit-scrollbar-thumb {
          background: var(--neutral-alpha-medium);
          border-radius: 4px;
        }
        .time-scroll::-webkit-scrollbar-thumb:hover {
          background: var(--brand-alpha-medium);
        }
        @keyframes rdp-fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .rdp-widget {
          animation: rdp-fade-in 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>

      {/* Widget container */}
      <div
        ref={panelRef}
        className="rdp-widget"
        style={{
          background: "var(--neutral-background-strong)",
          border: "1px solid var(--neutral-alpha-medium)",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(0,0,0,0.32), 0 1px 0 rgba(255,255,255,0.05) inset",
          backdropFilter: "blur(20px)",
          width: "100%",
          maxWidth: "720px",
          margin: "0 auto",
        }}
      >
        {/* Header strip */}
        <div style={{
          padding: "20px 24px 16px",
          borderBottom: "1px solid var(--neutral-alpha-weak)",
          background: "linear-gradient(135deg, var(--brand-alpha-weak) 0%, transparent 60%)",
        }}>
          <div style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--brand-on-background-medium)",
            marginBottom: "4px",
          }}>
            eFoil Rental
          </div>
          <div style={{
            fontSize: "20px",
            fontWeight: 700,
            fontFamily: "var(--font-heading)",
            color: "var(--neutral-on-background-strong)",
            lineHeight: 1.2,
          }}>
            When do you want to fly?
          </div>
        </div>

        <div style={{ padding: "20px 24px" }}>
          {/* Pickup / Return pills */}
          <div style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
          }}>
            <LegPill
              label="Pickup"
              icon="↑"
              date={selection.pickupDate}
              time={selection.pickupTime}
              active={mode === "pickup"}
              onClick={() => setMode("pickup")}
            />

            <div style={{
              display: "flex",
              alignItems: "center",
              color: "var(--neutral-on-background-weak)",
              fontSize: "18px",
              flexShrink: 0,
            }}>
              →
            </div>

            <LegPill
              label="Return"
              icon="↓"
              date={selection.returnDate}
              time={selection.returnTime}
              active={mode === "return"}
              onClick={() => setMode(selection.pickupDate ? "return" : "pickup")}
            />
          </div>

          {/* Rental duration badge */}
          {rentalDays !== null && (
            <div style={{
              textAlign: "center",
              marginBottom: "16px",
            }}>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "var(--brand-alpha-weak)",
                border: "1px solid var(--brand-alpha-medium)",
                borderRadius: "100px",
                padding: "4px 14px",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--brand-on-background-strong)",
                fontFamily: "var(--font-label)",
              }}>
                <span style={{ fontSize: "14px" }}>~</span>
                {rentalDays} {rentalDays === 1 ? "day" : "days"} rental
              </span>
            </div>
          )}

          {/* Main panel: Calendar + Time pickers */}
          <div className="rdp-split-grid" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1px 1fr",
            gap: "0",
            alignItems: "start",
          }}>
            {/* Calendar */}
            <div style={{ paddingRight: "20px" }}>
              <div style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: mode === "pickup"
                  ? "var(--brand-on-background-strong)"
                  : "var(--neutral-on-background-weak)",
                marginBottom: "12px",
                transition: "color 0.2s",
              }}>
                {mode === "return" ? "Select return date" : "Select pickup date"}
              </div>
              <Calendar
                viewYear={viewYear}
                viewMonth={viewMonth}
                pickupDate={selection.pickupDate}
                returnDate={selection.returnDate}
                mode={mode}
                onDayClick={handleDayClick}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
              />
            </div>

            {/* Divider */}
            <div className="rdp-split-divider" style={{
              background: "var(--neutral-alpha-weak)",
              alignSelf: "stretch",
            }} />

            {/* Time pickers */}
            <div className="rdp-time-panel" style={{
              paddingLeft: "20px",
              display: "flex",
              gap: "12px",
            }}>
              <TimePicker
                label="Pickup time"
                value={selection.pickupTime}
                onChange={t => setSelection(prev => ({ ...prev, pickupTime: t }))}
              />
              <div style={{ width: "1px", background: "var(--neutral-alpha-weak)", alignSelf: "stretch" }} />
              <TimePicker
                label="Return time"
                value={selection.returnTime}
                onChange={t => setSelection(prev => ({ ...prev, returnTime: t }))}
              />
            </div>
          </div>

          {/* CTA */}
          <div style={{
            marginTop: "20px",
            paddingTop: "20px",
            borderTop: "1px solid var(--neutral-alpha-weak)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
          }}>
            <div style={{ fontSize: "13px", color: "var(--neutral-on-background-weak)" }}>
              {!selection.pickupDate
                ? "Click a date to set your pickup day"
                : !selection.returnDate
                ? "Now select your return date"
                : "Looks great! Ready to book?"}
            </div>

            <button
              type="button"
              onClick={handleBook}
              disabled={!isComplete}
              style={{
                background: isComplete
                  ? "var(--brand-solid-strong)"
                  : "var(--neutral-alpha-weak)",
                border: "none",
                borderRadius: "12px",
                padding: "12px 28px",
                fontSize: "14px",
                fontWeight: 700,
                fontFamily: "var(--font-label)",
                letterSpacing: "0.02em",
                cursor: isComplete ? "pointer" : "not-allowed",
                color: isComplete
                  ? "var(--brand-on-solid-strong)"
                  : "var(--neutral-on-background-weak)",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => {
                if (isComplete) {
                  (e.currentTarget as HTMLElement).style.opacity = "0.85";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                }
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Check Availability
              <span style={{ fontSize: "16px" }}>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile layout: shown below a certain width via JS class swap */}
      <style>{`
        @media (max-width: 600px) {
          .rdp-split-grid {
            grid-template-columns: 1fr !important;
          }
          .rdp-split-divider {
            display: none !important;
          }
          .rdp-time-panel {
            padding-left: 0 !important;
            padding-top: 20px !important;
            border-top: 1px solid var(--neutral-alpha-weak);
          }
        }
      `}</style>
    </div>
  );
}
