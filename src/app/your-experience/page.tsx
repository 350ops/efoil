"use client";

import { useEffect, useState } from "react";
import { Column, Heading, Text } from "@once-ui-system/core";

interface BookingDraft {
  date?: string;
  time?: string;
  days?: number;
}

export default function YourExperiencePage() {
  const [booking, setBooking] = useState<BookingDraft | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("bookingDraft");
    if (raw) {
      try {
        setBooking(JSON.parse(raw));
      } catch {
        /* ignore */
      }
    }
  }, []);

  return (
    <Column
      fillWidth
      maxWidth="m"
      paddingX="l"
      paddingY="xl"
      gap="l"
      horizontal="center"
      style={{ minHeight: "80vh" }}
    >
      <Heading as="h1" variant="display-strong-l" align="center">
        Your Experience
      </Heading>
      <Text variant="body-default-l" onBackground="neutral-weak" align="center">
        We&apos;re preparing your custom eFoil experience.
      </Text>
      {booking?.date && (
        <Text variant="body-default-m" onBackground="neutral-medium" align="center">
          {booking.days} {booking.days === 1 ? "day" : "days"} starting{" "}
          {new Date(booking.date + "T00:00:00").toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
          {booking.time ? ` at ${booking.time}` : ""}
        </Text>
      )}
    </Column>
  );
}
