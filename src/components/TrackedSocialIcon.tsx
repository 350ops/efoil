"use client";

import { IconButton } from "@once-ui-system/core";
import { trackSocialClick } from "@/lib/analytics";

interface TrackedSocialIconProps {
  name: string;
  link: string;
  icon: string;
}

export function TrackedSocialIcon({ name, link, icon }: TrackedSocialIconProps) {
  return (
    <IconButton
      href={link}
      icon={icon}
      tooltip={name}
      size="s"
      variant="ghost"
      onClick={() => trackSocialClick(name.toLowerCase())}
    />
  );
}
