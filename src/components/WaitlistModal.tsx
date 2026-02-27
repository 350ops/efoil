"use client";

import { useState } from "react";
import { Button, Column, Heading, Input, Row, Text } from "@once-ui-system/core";
import { trackWaitlistSignup } from "@/lib/analytics";

interface WaitlistModalProps {
  open: boolean;
  onClose: () => void;
}

const LOCATION_OPTIONS = ["Yacht", "Resort", "Other"];

export function WaitlistModal({ open, onClose }: WaitlistModalProps) {
  const [form, setForm] = useState({
    email: "",
    name: "",
    dates: "",
    locationType: "",
    _hp: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/leads/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }
      trackWaitlistSignup("club_waitlist_modal");
      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <Column
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        background="page"
        radius="xl"
        padding="40"
        gap="24"
        style={{ maxWidth: 480, width: "100%" }}
      >
        {status === "success" ? (
          <Column gap="16" horizontal="center">
            <Heading as="h3" variant="heading-strong-l" align="center">
              You&apos;re on the waitlist
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-weak" align="center">
              We&apos;ll contact you when space opens. Keep an eye on your inbox.
            </Text>
            <Button variant="secondary" size="m" onClick={onClose}>
              Close
            </Button>
          </Column>
        ) : (
          <Column as="form" gap="20" onSubmit={handleSubmit}>
            <Column gap="8">
              <Heading as="h3" variant="heading-strong-l" align="center">
                Join the Waitlist
              </Heading>
              <Text variant="body-default-s" onBackground="neutral-weak" align="center">
                Leave your email and we&apos;ll reach out when membership space opens.
              </Text>
            </Column>

            {/* Honeypot */}
            <input
              type="text"
              name="_hp"
              value={form._hp}
              onChange={update("_hp")}
              style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <Input
              id="waitlist-email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={update("email")}
              required
            />

            <Input
              id="waitlist-name"
              label="Name (optional)"
              placeholder="Your name"
              value={form.name}
              onChange={update("name")}
            />

            <Input
              id="waitlist-dates"
              label="Travel Dates (optional)"
              placeholder="e.g. March 2026"
              value={form.dates}
              onChange={update("dates")}
            />

            <Column fillWidth>
              <label htmlFor="waitlist-location" style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: 6, color: "var(--neutral-on-background-strong)" }}>
                Yacht / Resort? (optional)
              </label>
              <select
                id="waitlist-location"
                value={form.locationType}
                onChange={update("locationType")}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid var(--neutral-alpha-medium)",
                  background: "var(--surface-background)",
                  color: "var(--neutral-on-background-strong)",
                  fontSize: 14,
                  fontFamily: "inherit",
                }}
              >
                <option value="">Select...</option>
                {LOCATION_OPTIONS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </Column>

            {status === "error" && (
              <Text variant="body-default-s" onBackground="danger-strong" align="center">
                {errorMsg}
              </Text>
            )}

            <Row gap="12" fillWidth horizontal="center">
              <Button
                type="submit"
                variant="primary"
                size="m"
                weight="strong"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Joining..." : "Join Waitlist"}
              </Button>
              <Button variant="tertiary" size="m" onClick={onClose}>
                Cancel
              </Button>
            </Row>
          </Column>
        )}
      </Column>
    </div>
  );
}
