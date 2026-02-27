"use client";

import { useState } from "react";
import { Button, Column, Heading, Input, Row, Text, Textarea } from "@once-ui-system/core";
import { trackMembershipApply } from "@/lib/analytics";

const LOCATION_TYPES = ["Yacht", "Resort", "Private Island", "Boat", "Other"];
const RIDER_LEVELS = ["Beginner", "Intermediate", "Advanced"];

export function MembershipApplicationForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dates: "",
    locationType: "",
    riderLevel: "",
    groupSize: "",
    message: "",
    consent: false,
    _hp: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/leads/membership", {
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
      trackMembershipApply("club_page_form");
      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <Column
        fillWidth padding="48" gap="20" horizontal="center"
        background="brand-alpha-weak" radius="xl"
      >
        <Heading as="h3" variant="heading-strong-l" align="center">
          Application Received
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-weak" align="center">
          We review every application personally. You&apos;ll hear from us within 48 hours with next steps, availability, and scheduling options.
        </Text>
      </Column>
    );
  }

  return (
    <Column
      as="form"
      id="membership-application"
      fillWidth padding="48" gap="24"
      background="neutral-alpha-weak" radius="xl"
      onSubmit={handleSubmit}
    >
      <Column horizontal="center" gap="8">
        <Heading as="h2" variant="heading-strong-xl" align="center">
          Apply for Membership
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-weak" align="center">
          Applications are reviewed individually. Limited availability.
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

      <Row gap="16" fillWidth s={{ direction: "column" }}>
        <Column fillWidth>
          <Input
            id="membership-name"
            label="Name"
            placeholder="Your full name"
            value={form.name}
            onChange={update("name")}
            required
          />
        </Column>
        <Column fillWidth>
          <Input
            id="membership-email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={update("email")}
            required
          />
        </Column>
      </Row>

      <Row gap="16" fillWidth s={{ direction: "column" }}>
        <Column fillWidth>
          <Input
            id="membership-phone"
            label="Phone / WhatsApp (optional)"
            type="tel"
            placeholder="+1 ..."
            value={form.phone}
            onChange={update("phone")}
          />
        </Column>
        <Column fillWidth>
          <Input
            id="membership-dates"
            label="Travel Dates (optional)"
            placeholder="e.g. 15-22 March"
            value={form.dates}
            onChange={update("dates")}
          />
        </Column>
      </Row>

      <Row gap="16" fillWidth s={{ direction: "column" }}>
        <Column fillWidth>
          <label htmlFor="membership-location" style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: 6, color: "var(--neutral-on-background-strong)" }}>
            Location Type
          </label>
          <select
            id="membership-location"
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
            {LOCATION_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Column>
        <Column fillWidth>
          <label htmlFor="membership-level" style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: 6, color: "var(--neutral-on-background-strong)" }}>
            Rider Level
          </label>
          <select
            id="membership-level"
            value={form.riderLevel}
            onChange={update("riderLevel")}
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
            {RIDER_LEVELS.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </Column>
      </Row>

      <Row gap="16" fillWidth s={{ direction: "column" }}>
        <Column fillWidth>
          <Input
            id="membership-group"
            label="Group Size (optional)"
            placeholder="e.g. 4"
            value={form.groupSize}
            onChange={update("groupSize")}
          />
        </Column>
        <Column fillWidth>
          <Textarea
            id="membership-message"
            label="Anything else? (optional)"
            placeholder="Special requests, questions..."
            value={form.message}
            onChange={update("message")}
            lines={2}
            resize="vertical"
          />
        </Column>
      </Row>

      <Row gap="8" vertical="center" fillWidth>
        <input
          type="checkbox"
          id="membership-consent"
          checked={form.consent}
          onChange={(e) => setForm((prev) => ({ ...prev, consent: e.target.checked }))}
          required
          style={{ width: 18, height: 18, cursor: "pointer", accentColor: "var(--brand-on-background-strong)" }}
        />
        <label htmlFor="membership-consent" style={{ fontSize: 13, color: "var(--neutral-on-background-weak)", cursor: "pointer" }}>
          I understand membership is application-only and availability is limited.
        </label>
      </Row>

      {status === "error" && (
        <Text variant="body-default-s" onBackground="danger-strong" align="center">
          {errorMsg}
        </Text>
      )}

      <Row fillWidth horizontal="center">
        <Button
          type="submit"
          variant="primary"
          size="l"
          weight="strong"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Submitting..." : "Submit Application"}
        </Button>
      </Row>
    </Column>
  );
}
