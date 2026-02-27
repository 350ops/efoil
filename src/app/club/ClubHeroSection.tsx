"use client";

import { useState } from "react";
import { Button, Column } from "@once-ui-system/core";
import { trackClubCTA } from "@/lib/analytics";
import { WaitlistModal } from "@/components/WaitlistModal";

export function ClubHeroSection() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <>
      <Column gap="16" horizontal="center" fillWidth style={{ maxWidth: 480 }}>
        <Button
          href="#membership-application"
          variant="primary"
          size="l"
          weight="strong"
          fillWidth
          onClick={() => trackClubCTA("hero_apply")}
        >
          Apply for Membership
        </Button>
        <Button
          href="/efoil-experiences-maldives"
          variant="secondary"
          size="l"
          fillWidth
          arrowIcon
          onClick={() => trackClubCTA("hero_experiences")}
        >
          Explore Private eFoil Experiences
        </Button>
        <Button
          variant="tertiary"
          size="m"
          onClick={() => {
            trackClubCTA("hero_waitlist");
            setWaitlistOpen(true);
          }}
        >
          Leave your email &amp; join the waitlist
        </Button>
      </Column>
      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  );
}
