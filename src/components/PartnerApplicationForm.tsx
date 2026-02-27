"use client";

import { useState } from "react";
import { Button, Column, Heading, Input, Row, Select, Text, Textarea } from "@once-ui-system/core";
import { trackLeadSubmit } from "@/lib/analytics";

const operationOptions = [
  { value: "water-sport-operator", label: "Water Sport Operator" },
  { value: "dive-centre", label: "Dive Centre" },
  { value: "excursion-provider", label: "Excursion / Tour Provider" },
  { value: "charter-agency", label: "Yacht / Boat Charter Agency" },
  { value: "resort-staff", label: "Hotel / Resort Water Sports Team" },
  { value: "entrepreneur", label: "Independent Entrepreneur" },
  { value: "other", label: "Other" },
];

export function PartnerApplicationForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    operationType: "",
    location: "",
    experience: "",
    message: "",
    _hp: "",
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
      const res = await fetch("/api/leads/partner", {
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
      trackLeadSubmit("partner");
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
          Application Received
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-weak" align="center">
          We review applications within one week. We'll reach out by email to discuss next steps.
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
          Apply to Become a Partner
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-weak" align="center">
          Tell us about your operation—we'll be in touch within a week
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
            id="partner-name"
            label="Full Name"
            placeholder="Your name"
            value={form.name}
            onChange={update("name")}
            required
          />
        </Column>
        <Column fillWidth>
          <Input
            id="partner-email"
            label="Email"
            type="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={update("email")}
            required
          />
        </Column>
      </Row>

      <Row gap="16" fillWidth s={{ direction: "column" }}>
        <Column fillWidth>
          <Input
            id="partner-phone"
            label="Phone (optional)"
            type="tel"
            placeholder="+960..."
            value={form.phone}
            onChange={update("phone")}
          />
        </Column>
        <Column fillWidth>
          <Input
            id="partner-company"
            label="Company Name (optional)"
            placeholder="Your business name"
            value={form.company}
            onChange={update("company")}
          />
        </Column>
      </Row>

      <Row gap="16" fillWidth s={{ direction: "column" }}>
        <Column fillWidth>
          <Select
            id="partner-operation-type"
            label="Type of Operation"
            options={operationOptions}
            value={form.operationType}
            onSelect={(value: string) => setForm((prev) => ({ ...prev, operationType: value }))}
          />
        </Column>
        <Column fillWidth>
          <Input
            id="partner-location"
            label="Location / Atoll"
            placeholder="Where do you operate?"
            value={form.location}
            onChange={update("location")}
            required
          />
        </Column>
      </Row>

      <Column fillWidth>
        <Textarea
          id="partner-experience"
          label="Relevant Experience (optional)"
          placeholder="Water sport certifications, years in operation, team size..."
          value={form.experience}
          onChange={update("experience")}
          lines={3}
          resize="vertical"
        />
      </Column>

      <Column fillWidth>
        <Textarea
          id="partner-message"
          label="Anything else? (optional)"
          placeholder="Questions, preferred partnership model, timeline..."
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
          {status === "loading" ? "Sending..." : "Submit Application"}
        </Button>
      </Row>
    </Column>
  );
}
