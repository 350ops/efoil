"use client";

import { useEffect, useState } from "react";
import { Column, Heading, Text, Button, Row, Flex, Icon } from "@once-ui-system/core";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [pendingBooking, setPendingBooking] = useState<any>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("pendingBooking");
    if (data) {
      setPendingBooking(JSON.parse(data));
    }
  }, []);

  const handleGoogleLogin = () => {
    // This is where the OAuth flow is triggered.
    // For now, we redirect to a placeholder that reflects the next step.
    console.log("Triggering Google OAuth Flow...");
    
    // Instructions for User:
    // Once you have your Client ID, you can use a library like Supabase or Auth.js here.
    // Example with Supabase:
    // supabase.auth.signInWithOAuth({ provider: 'google' })
  };

  return (
    <Column fillWidth fillHeight horizontal="center" vertical="center" paddingY="128">
      <Column maxWidth={28} gap="32" horizontal="center">
        <Column gap="12" horizontal="center">
          <Heading variant="display-strong-xs" align="center">
            Finalize your booking
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-weak" align="center">
            Sign up or log in to complete your eFoil reservation.
          </Text>
        </Column>

        {pendingBooking && (
          <Column fillWidth padding="m" radius="m" border="neutral-alpha-medium" gap="12">
            <Text variant="label-default-s" onBackground="neutral-medium" style={{ letterSpacing: "1px" }}>
              YOUR SELECTION
            </Text>
            <Column gap="4">
              <Text variant="body-default-m" onBackground="neutral-strong" style={{ fontWeight: 600 }}>
                {pendingBooking.place}
              </Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {pendingBooking.date} at {pendingBooking.time}
              </Text>
            </Column>
          </Column>
        )}

        <Column fillWidth gap="12">
          <Button
            fillWidth
            variant="secondary"
            size="l"
            onClick={handleGoogleLogin}
            style={{ fontWeight: 600 }}
          >
            <Row gap="12" vertical="center">
              <Icon name="google" size="s" />
              Continue with Google
            </Row>
          </Button>
          
          <Button
            fillWidth
            variant="tertiary"
            size="m"
            onClick={() => router.back()}
          >
            Back to location
          </Button>
        </Column>

        <Text variant="body-default-xs" onBackground="neutral-weak" align="center" style={{ maxWidth: "240px" }}>
          By continuing, you agree to our{" "}
          <a href="/terms" style={{ textDecoration: "underline", color: "inherit" }}>
            terms of service
          </a>{" "}
          and{" "}
          <a href="/privacy" style={{ textDecoration: "underline", color: "inherit" }}>
            privacy policy
          </a>.
        </Text>
      </Column>
    </Column>
  );
}
