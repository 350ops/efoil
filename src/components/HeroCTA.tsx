"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Column, Row, Text, Heading } from "@once-ui-system/core";
import { Calendar } from "@/components/ui/Calendar";
import { Clock2 } from "lucide-react";
import { trackBookNow, trackViewPackages } from "@/lib/analytics";

const DURATION_OPTIONS = [1, 2, 3, 4, 5, 6, 7] as const;

function getTomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(0, 0, 0, 0);
  return d;
}

function toISODate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const timeInputStyle: React.CSSProperties = {
  flex: 1,
  padding: "8px 10px",
  border: "1px solid var(--neutral-border-medium)",
  borderRight: "none",
  borderRadius: "8px 0 0 8px",
  backgroundColor: "transparent",
  color: "var(--neutral-on-background-strong)",
  fontSize: "14px",
  fontFamily: "inherit",
  outline: "none",
  WebkitAppearance: "none",
  MozAppearance: "textfield" as React.CSSProperties["MozAppearance"],
};

const timeAddonStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 10px",
  border: "1px solid var(--neutral-border-medium)",
  borderLeft: "none",
  borderRadius: "0 8px 8px 0",
  color: "var(--neutral-on-background-weak, #64748b)",
};

export function HeroCTA() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [startTime, setStartTime] = useState("10:30");
  const [endTime, setEndTime] = useState("12:30");
  const [days, setDays] = useState(1);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const dateISO = selectedDate ? toISODate(selectedDate) : "";

  function handleLocationClick() {
    const booking = { date: dateISO, startTime, endTime, days };
    sessionStorage.setItem("bookingDraft", JSON.stringify(booking));
    router.push("/book/location");
  }

  function handleExperienceClick() {
    const booking = { date: dateISO, startTime, endTime, days };
    sessionStorage.setItem("bookingDraft", JSON.stringify(booking));
    router.push("/your-experience");
  }

  const tomorrow = getTomorrow();

  return (
    <Column gap="16" horizontal="center" fillWidth>
      <Button
        id="book-now"
        data-border="rounded"
        variant="primary"
        size="l"
        weight="strong"
        fillWidth
        onClick={() => {
          trackBookNow("hero");
          setOpen((prev) => !prev);
        }}
      >
        {open ? "Close" : "Book yours"}
      </Button>

      {open && (
        <div
          ref={panelRef}
          style={{
            width: "100%",
            borderRadius: "16px",
            border: "1px solid var(--neutral-border-medium)",
            background: "var(--neutral-background-strong)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
            overflow: "hidden",
          }}
        >
          {/* Card content: Calendar */}
          <div style={{ padding: "20px 20px 16px" }}>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={{ before: tomorrow }}
              defaultMonth={tomorrow}
            />
          </div>

          {/* Card footer: Time pickers */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              padding: "16px 20px",
              display: "flex",
              gap: "12px",
            }}
          >
            {/* Start Time */}
            <div style={{ flex: 1 }}>
              <label
                htmlFor="time-from"
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "var(--neutral-on-background-weak, #94a3b8)",
                  marginBottom: "6px",
                  fontFamily: "inherit",
                }}
              >
                Start Time
              </label>
              <div style={{ display: "flex" }}>
                <input
                  id="time-from"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  style={timeInputStyle}
                />
                <div style={timeAddonStyle}>
                  <Clock2 size={16} />
                </div>
              </div>
            </div>

            {/* End Time */}
            <div style={{ flex: 1 }}>
              <label
                htmlFor="time-to"
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "var(--neutral-on-background-weak, #94a3b8)",
                  marginBottom: "6px",
                  fontFamily: "inherit",
                }}
              >
                End Time
              </label>
              <div style={{ display: "flex" }}>
                <input
                  id="time-to"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  style={timeInputStyle}
                />
                <div style={timeAddonStyle}>
                  <Clock2 size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Duration + Actions */}
          <Column padding="20" paddingTop="4" gap="16">
            <Column gap="4">
              <Text variant="label-default-s" onBackground="neutral-medium">
                DURATION
              </Text>
              <Row gap="8" style={{ flexWrap: "wrap" }}>
                {DURATION_OPTIONS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDays(d)}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      border: days === d
                        ? "2px solid var(--brand-on-background-strong)"
                        : "1px solid var(--neutral-border-medium)",
                      backgroundColor: days === d
                        ? "var(--brand-alpha-medium)"
                        : "transparent",
                      color: "var(--neutral-on-background-strong)",
                      fontSize: "14px",
                      fontWeight: 600,
                      fontFamily: "inherit",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {d}
                  </button>
                ))}
              </Row>
              <Text variant="body-default-xs" onBackground="neutral-weak">
                {days === 1 ? "1 Day" : `${days} Days`}
              </Text>
            </Column>

            <Button
              variant="secondary"
              size="m"
              fillWidth
              onClick={handleLocationClick}
            >
              Location
            </Button>

            <Button
              variant="primary"
              size="m"
              fillWidth
              arrowIcon
              onClick={handleExperienceClick}
            >
              Your Experience
            </Button>
          </Column>
        </div>
      )}

      <Button
        id="learn-more"
        data-border="rounded"
        href="/about"
        variant="secondary"
        size="l"
        fillWidth
        onClick={() => trackViewPackages("hero_learn_more")}
      >
        Learn More
      </Button>
    </Column>
  );
}

export function BottomCTA() {
  return (
    <Button
      href="/work"
      variant="primary"
      size="l"
      weight="strong"
      arrowIcon
      fillWidth
      onClick={() => trackViewPackages("bottom_cta")}
    >
      View Packages & Book Now
    </Button>
  );
}
