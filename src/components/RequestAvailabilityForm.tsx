"use client";

import { useState } from "react";
import { Button, Column, Heading, Input, Row, Text, Textarea } from "@once-ui-system/core";
import { trackLeadSubmit } from "@/lib/analytics";

export function RequestAvailabilityForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    dates: "",
    guests: "",
    message: "",
    _hp: "", // honeypot
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/leads/availability", {
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
      trackLeadSubmit("availability");
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
        <Text variant="display-strong-m" align="center">✓</Text>
        <Heading as="h3" variant="heading-strong-l" align="center">
          Request Received
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-weak" align="center">
          We'll check availability and get back to you within a few hours. Keep an eye on your email.
        </Text>
      </Column>
    );
  }

  return (
    <Column
      as="form"
      fillWidth padding="48" gap="24"
      background="neutral-alpha-weak" radius="xl"
      
      onSubmit={handleSubmit}
    >
      <Column horizontal="center" gap="8">
        <Heading as="h2" variant="heading-strong-xl" align="center">
          Request Availability
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-weak" align="center">
          Tell us where and when—we'll confirm if we can deliver
        </Text>
      </Column>

      {/* Honeypot — hidden from humans */}
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
            id="name"
            label="Name"
            placeholder="Your name"
            value={form.name}
            onChange={update("name")}
            required
          />
        </Column>
        <Column fillWidth>
          <Input
            id="email"
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
            id="phone"
            label="Phone (optional)"
            type="tel"
            placeholder="+960..."
            value={form.phone}
            onChange={update("phone")}
          />
        </Column>
        <Column fillWidth>
          <Input
            id="location"
            label="Location"
            placeholder="Yacht name, resort, or atoll"
            value={form.location}
            onChange={update("location")}
            required
          />
        </Column>
      </Row>

      <Row gap="16" fillWidth s={{ direction: "column" }}>
        <Column fillWidth>
          <Input
            id="dates"
            label="Preferred Dates (optional)"
            placeholder="e.g. 15–18 March"
            value={form.dates}
            onChange={update("dates")}
          />
        </Column>
        <Column fillWidth>
          <Input
            id="guests"
            label="Number of Guests (optional)"
            placeholder="e.g. 4"
            value={form.guests}
            onChange={update("guests")}
          />
        </Column>
      </Row>

      <Column fillWidth>
        <Textarea
          id="message"
          label="Anything else? (optional)"
          placeholder="Special requests, group details, questions..."
          value={form.message}
          onChange={update("message")}
          lines={3}
          resize="vertical"
        />
      </Column>

      {status === "error" && (
        <Text variant="body-default-s" onBackground="danger-strong" align="center">
          {errorMsg}
        </Text>
      )}

      <Row fillWidth horizontal="center" s={{ direction: "column" }}>
        <Button
          type="submit"
          variant="primary"
          size="l"
          weight="strong"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Check Availability"}
        </Button>
      </Row>
    </Column>
  );
}
