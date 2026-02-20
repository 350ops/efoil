"use client";

import { useState, useCallback, useRef, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type SelectionMode = "pickup" | "return" | null;

interface RentalSelection {
  pickupDate: Date | null;
  pickupTime: string;
  returnDate: Date | null;
  returnTime: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAYS_SHORT = ["Su","Mo","Tu","We","Th","Fr","Sa"];

const TIME_SLOTS = [
  "06:00","07:00","08:00","09:00","10:00","11:00",
  "12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(t: string) {
  if (!t) return "";
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}:${m.toString().padStart(2, "0")} ${ampm}`;
}

function formatDateShort(d: Date | null) {
  if (!d) return null;
  return `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}`;
}

function formatDateFull(d: Date | null) {
  if (!d) return null;
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
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

// ─── Calendar ─────────────────────────────────────────────────────────────────

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

function Calendar({ viewYear, viewMonth, pickupDate, returnDate, mode, onDayClick, onPrevMonth, onNextMonth }: CalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const cells: Array<Date | null> = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(viewYear, viewMonth, d));

  return (
    <div style={{ width: "100%", minWidth: 0 }}>
      {/* Month navigation */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <button
          type="button"
          onClick={onPrevMonth}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "var(--neutral-on-background-weak)",
            width: "28px", height: "28px", borderRadius: "8px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "16px", transition: "all 0.15s ease", flexShrink: 0,
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "var(--neutral-alpha-weak)";
            (e.currentTarget as HTMLElement).style.color = "var(--neutral-on-background-strong)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "none";
            (e.currentTarget as HTMLElement).style.color = "var(--neutral-on-background-weak)";
          }}
        >‹</button>

        <span style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 600,
          fontSize: "13px",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--neutral-on-background-strong)",
        }}>
          {MONTHS[viewMonth]} {viewYear}
        </span>

        <button
          type="button"
          onClick={onNextMonth}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "var(--neutral-on-background-weak)",
            width: "28px", height: "28px", borderRadius: "8px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "16px", transition: "all 0.15s ease", flexShrink: 0,
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "var(--neutral-alpha-weak)";
            (e.currentTarget as HTMLElement).style.color = "var(--neutral-on-background-strong)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "none";
            (e.currentTarget as HTMLElement).style.color = "var(--neutral-on-background-weak)";
          }}
        >›</button>
      </div>

      {/* Day headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: "6px" }}>
        {DAYS_SHORT.map(d => (
          <div key={d} style={{
            textAlign: "center", fontSize: "10px", fontWeight: 600,
            letterSpacing: "0.06em", textTransform: "uppercase",
            color: "var(--neutral-on-background-weak)", padding: "3px 0",
          }}>{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px" }}>
        {cells.map((day, idx) => {
          if (!day) return <div key={`e-${idx}`} />;

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
                borderRadius: isSelected ? "50%" : inRange ? "0" : "6px",
                width: "100%", aspectRatio: "1",
                cursor: isPast ? "not-allowed" : "pointer",
                fontSize: "12px",
                fontWeight: isSelected ? 700 : 400,
                fontFamily: "var(--font-body)",
                transition: "all 0.12s ease",
                color: isSelected
                  ? "var(--brand-on-solid-strong)"
                  : isPast ? "var(--neutral-on-background-weak)"
                  : inRange ? "var(--brand-on-background-strong)"
                  : isToday ? "var(--brand-on-background-strong)"
                  : "var(--neutral-on-background-medium)",
                background: isSelected
                  ? "var(--brand-solid-strong)"
                  : inRange ? "var(--brand-alpha-weak)"
                  : "transparent",
                outline: isToday && !isSelected ? "1px solid var(--neutral-alpha-medium)" : "none",
                opacity: isPast ? 0.25 : 1,
              }}
              onMouseEnter={e => {
                if (!isPast && !isSelected) {
                  (e.currentTarget as HTMLElement).style.background = "var(--neutral-alpha-weak)";
                  (e.currentTarget as HTMLElement).style.color = "var(--neutral-on-background-strong)";
                  (e.currentTarget as HTMLElement).style.borderRadius = "6px";
                }
              }}
              onMouseLeave={e => {
                if (!isPast && !isSelected) {
                  (e.currentTarget as HTMLElement).style.background = inRange ? "var(--brand-alpha-weak)" : "transparent";
                  (e.currentTarget as HTMLElement).style.color = inRange ? "var(--brand-on-background-strong)" : "var(--neutral-on-background-medium)";
                  (e.currentTarget as HTMLElement).style.borderRadius = inRange ? "0" : "6px";
                }
              }}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Time Column ──────────────────────────────────────────────────────────────

function TimeColumn({ label, value, onChange }: { label: string; value: string; onChange: (t: string) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: 0 }}>
      <div style={{
        fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em",
        textTransform: "uppercase", color: "var(--neutral-on-background-weak)",
      }}>{label}</div>
      <div
        className="rdp-time-scroll"
        style={{
          display: "flex", flexDirection: "column", gap: "3px",
          maxHeight: "220px", overflowY: "auto", paddingRight: "2px",
        }}
      >
        {TIME_SLOTS.map(slot => {
          const sel = value === slot;
          return (
            <button
              key={slot}
              type="button"
              onClick={() => onChange(slot)}
              style={{
                border: sel ? "1px solid var(--brand-alpha-medium)" : "1px solid transparent",
                borderRadius: "6px",
                padding: "5px 8px",
                cursor: "pointer",
                fontSize: "11px",
                fontFamily: "var(--font-code)",
                fontWeight: sel ? 600 : 400,
                color: sel ? "var(--brand-on-background-strong)" : "var(--neutral-on-background-weak)",
                background: sel ? "var(--brand-alpha-weak)" : "transparent",
                transition: "all 0.1s ease",
                textAlign: "left",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={e => {
                if (!sel) {
                  (e.currentTarget as HTMLElement).style.background = "var(--neutral-alpha-weak)";
                  (e.currentTarget as HTMLElement).style.color = "var(--neutral-on-background-strong)";
                }
              }}
              onMouseLeave={e => {
                if (!sel) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "var(--neutral-on-background-weak)";
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

// ─── Trigger bar ──────────────────────────────────────────────────────────────

interface TriggerProps {
  pickupDate: Date | null;
  pickupTime: string;
  returnDate: Date | null;
  returnTime: string;
  open: boolean;
  onClick: () => void;
}

function TriggerBar({ pickupDate, pickupTime, returnDate, returnTime, open, onClick }: TriggerProps) {
  const hasPickup = !!pickupDate;
  const hasReturn = !!returnDate;

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "0",
        background: "var(--neutral-background-medium)",
        border: open
          ? "1px solid var(--neutral-alpha-strong)"
          : "1px solid var(--neutral-alpha-medium)",
        borderRadius: open ? "14px 14px 0 0" : "14px",
        padding: "0",
        cursor: "pointer",
        transition: "all 0.2s ease",
        overflow: "hidden",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--neutral-alpha-strong)";
      }}
      onMouseLeave={e => {
        if (!open) (e.currentTarget as HTMLElement).style.borderColor = "var(--neutral-alpha-medium)";
      }}
    >
      {/* Pickup segment */}
      <div style={{
        flex: 1,
        padding: "14px 20px",
        textAlign: "left",
        borderRight: "1px solid var(--neutral-alpha-medium)",
        minWidth: 0,
      }}>
        <div style={{
          fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--neutral-on-background-weak)",
          marginBottom: "3px",
        }}>Pickup</div>
        {hasPickup ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            <span style={{
              fontSize: "13px", fontWeight: 600,
              color: "var(--neutral-on-background-strong)",
              fontFamily: "var(--font-heading)",
            }}>
              {formatDateShort(pickupDate)}
            </span>
            <span style={{
              fontSize: "11px", fontFamily: "var(--font-code)",
              color: "var(--brand-on-background-medium)",
            }}>
              {formatTime(pickupTime)}
            </span>
          </div>
        ) : (
          <span style={{ fontSize: "13px", color: "var(--neutral-on-background-weak)" }}>
            Add date
          </span>
        )}
      </div>

      {/* Arrow */}
      <div style={{
        padding: "0 12px",
        color: "var(--neutral-on-background-weak)",
        fontSize: "12px",
        flexShrink: 0,
      }}>→</div>

      {/* Return segment */}
      <div style={{
        flex: 1,
        padding: "14px 20px",
        textAlign: "left",
        borderLeft: "1px solid var(--neutral-alpha-medium)",
        minWidth: 0,
      }}>
        <div style={{
          fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--neutral-on-background-weak)",
          marginBottom: "3px",
        }}>Return</div>
        {hasReturn ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            <span style={{
              fontSize: "13px", fontWeight: 600,
              color: "var(--neutral-on-background-strong)",
              fontFamily: "var(--font-heading)",
            }}>
              {formatDateShort(returnDate)}
            </span>
            <span style={{
              fontSize: "11px", fontFamily: "var(--font-code)",
              color: "var(--brand-on-background-medium)",
            }}>
              {formatTime(returnTime)}
            </span>
          </div>
        ) : (
          <span style={{ fontSize: "13px", color: "var(--neutral-on-background-weak)" }}>
            Add date
          </span>
        )}
      </div>

      {/* Chevron */}
      <div style={{
        padding: "0 16px",
        color: "var(--neutral-on-background-weak)",
        fontSize: "11px",
        flexShrink: 0,
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1)",
      }}>▼</div>
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RentalDatePicker() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState<RentalSelection>({
    pickupDate: null,
    pickupTime: "09:00",
    returnDate: null,
    returnTime: "17:00",
  });
  const [mode, setMode] = useState<SelectionMode>("pickup");
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleDayClick = useCallback((day: Date) => {
    if (mode === "pickup") {
      setSelection(prev => ({
        ...prev,
        pickupDate: day,
        returnDate: prev.returnDate && prev.returnDate <= day ? null : prev.returnDate,
      }));
      setMode("return");
    } else if (mode === "return") {
      if (selection.pickupDate && day <= selection.pickupDate) {
        setSelection(prev => ({ ...prev, pickupDate: day, returnDate: null }));
        setMode("return");
      } else {
        setSelection(prev => ({ ...prev, returnDate: day }));
        setMode(null);
      }
    }
  }, [mode, selection.pickupDate]);

  const handlePrevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const handleNextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isComplete = !!(selection.pickupDate && selection.returnDate && selection.pickupTime && selection.returnTime);

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

  const hint = !selection.pickupDate
    ? "Select a pickup date"
    : !selection.returnDate
    ? "Now pick a return date"
    : `${rentalDays} day${rentalDays === 1 ? "" : "s"} · ${formatDateFull(selection.pickupDate)} → ${formatDateFull(selection.returnDate)}`;

  return (
    <>
      <style>{`
        @keyframes rdp-drop {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .rdp-panel {
          animation: rdp-drop 0.22s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .rdp-time-scroll::-webkit-scrollbar { width: 3px; }
        .rdp-time-scroll::-webkit-scrollbar-track { background: transparent; }
        .rdp-time-scroll::-webkit-scrollbar-thumb {
          background: var(--neutral-alpha-medium);
          border-radius: 4px;
        }
        .rdp-mode-btn {
          flex: 1;
          padding: 7px 12px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          transition: all 0.15s ease;
          font-family: var(--font-label);
        }
        .rdp-mode-btn-active {
          background: var(--neutral-alpha-medium);
          color: var(--neutral-on-background-strong);
        }
        .rdp-mode-btn-inactive {
          background: transparent;
          color: var(--neutral-on-background-weak);
        }
        .rdp-mode-btn-inactive:hover {
          background: var(--neutral-alpha-weak);
          color: var(--neutral-on-background-medium);
        }
        .rdp-book-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          border: none;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          font-family: var(--font-label);
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .rdp-book-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        @media (max-width: 640px) {
          .rdp-inner-grid {
            flex-direction: column !important;
          }
          .rdp-vdivider {
            width: 100% !important;
            height: 1px !important;
            margin: 12px 0 !important;
          }
          .rdp-time-cols {
            flex-direction: row !important;
          }
        }
      `}</style>

      <div ref={wrapperRef} style={{ width: "100%", position: "relative" }}>
        {/* ── Trigger ── */}
        <TriggerBar
          pickupDate={selection.pickupDate}
          pickupTime={selection.pickupTime}
          returnDate={selection.returnDate}
          returnTime={selection.returnTime}
          open={open}
          onClick={() => setOpen(o => !o)}
        />

        {/* ── Dropdown panel ── */}
        {open && (
          <div
            className="rdp-panel"
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              zIndex: 50,
              background: "var(--neutral-background-strong)",
              border: "1px solid var(--neutral-alpha-medium)",
              borderTop: "none",
              borderRadius: "0 0 14px 14px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.05) inset",
              overflow: "hidden",
            }}
          >
            {/* Mode switcher */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "12px 16px 0",
            }}>
              <button
                type="button"
                className={`rdp-mode-btn ${mode === "pickup" ? "rdp-mode-btn-active" : "rdp-mode-btn-inactive"}`}
                onClick={() => setMode("pickup")}
              >
                ↑ Pickup
              </button>
              <button
                type="button"
                className={`rdp-mode-btn ${mode === "return" || mode === null ? "rdp-mode-btn-active" : "rdp-mode-btn-inactive"}`}
                onClick={() => setMode(selection.pickupDate ? "return" : "pickup")}
              >
                ↓ Return
              </button>
            </div>

            {/* Calendar + Time columns */}
            <div
              className="rdp-inner-grid"
              style={{ display: "flex", gap: "0", padding: "16px 16px 0" }}
            >
              {/* Calendar */}
              <div style={{ flex: "1 1 0", minWidth: 0 }}>
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

              {/* Vertical divider */}
              <div
                className="rdp-vdivider"
                style={{
                  width: "1px",
                  background: "var(--neutral-alpha-weak)",
                  margin: "0 16px",
                  alignSelf: "stretch",
                }}
              />

              {/* Time columns */}
              <div
                className="rdp-time-cols"
                style={{
                  display: "flex",
                  gap: "12px",
                  flex: "0 0 auto",
                }}
              >
                <TimeColumn
                  label="Pickup time"
                  value={selection.pickupTime}
                  onChange={t => setSelection(prev => ({ ...prev, pickupTime: t }))}
                />
                <div style={{ width: "1px", background: "var(--neutral-alpha-weak)", alignSelf: "stretch" }} />
                <TimeColumn
                  label="Return time"
                  value={selection.returnTime}
                  onChange={t => setSelection(prev => ({ ...prev, returnTime: t }))}
                />
              </div>
            </div>

            {/* Footer: hint + CTA */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              padding: "14px 16px",
              marginTop: "12px",
              borderTop: "1px solid var(--neutral-alpha-weak)",
              flexWrap: "wrap",
            }}>
              <span style={{
                fontSize: "12px",
                color: isComplete ? "var(--neutral-on-background-medium)" : "var(--neutral-on-background-weak)",
                fontFamily: "var(--font-body)",
                minWidth: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                flex: 1,
              }}>
                {hint}
              </span>

              <button
                type="button"
                className="rdp-book-btn"
                disabled={!isComplete}
                onClick={handleBook}
                style={{
                  background: isComplete ? "var(--brand-solid-strong)" : "var(--neutral-alpha-weak)",
                  color: isComplete ? "var(--brand-on-solid-strong)" : "var(--neutral-on-background-weak)",
                }}
                onMouseEnter={e => {
                  if (isComplete) {
                    (e.currentTarget as HTMLElement).style.opacity = "0.82";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                  }
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.opacity = "1";
                  (e.currentTarget as HTMLElement).style.transform = "none";
                }}
              >
                Check Availability →
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
