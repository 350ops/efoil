"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import { Fade, Flex, Row } from "@once-ui-system/core";

import { routes, display, person, about, blog, efoilExperiences, gallery, events } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat(locale, options).format(now));
    };
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

function NavLink({
  href,
  label,
  selected,
}: {
  href: string;
  label: string;
  selected: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "6px 14px",
        borderRadius: "999px",
        fontSize: "13px",
        fontWeight: selected ? 600 : 400,
        fontFamily: "inherit",
        textDecoration: "none",
        letterSpacing: "0.01em",
        whiteSpace: "nowrap",
        color: selected
          ? "rgba(255,255,255,0.95)"
          : hovered
          ? "rgba(255,255,255,0.8)"
          : "rgba(255,255,255,0.5)",
        background: selected
          ? "rgba(255,255,255,0.14)"
          : hovered
          ? "rgba(255,255,255,0.07)"
          : "transparent",
        boxShadow: selected
          ? "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.12)"
          : "none",
        transition: "color 0.18s ease, background 0.18s ease",
      }}
    >
      {label}
    </Link>
  );
}

export const Header = () => {
  const pathname = usePathname() ?? "";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Fade s={{ hide: true }} fillWidth position="fixed" height="80" zIndex={9} />
      <Fade
        hide
        s={{ hide: false }}
        fillWidth
        position="fixed"
        bottom="0"
        to="top"
        height="80"
        zIndex={9}
      />
      <Row
        fitHeight
        className={styles.position}
        position="sticky"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
        s={{ position: "fixed" }}
      >
        {/* Left spacer */}
        <Row paddingLeft="12" fillWidth vertical="center" textVariant="body-default-s" />

        {/* Center: Liquid Glass pill */}
        <Row fillWidth horizontal="center">
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              padding: "4px 6px",
              borderRadius: "999px",
              background: scrolled
                ? "rgba(10, 12, 18, 0.60)"
                : "rgba(10, 12, 18, 0.40)",
              backdropFilter: "blur(32px) saturate(200%) brightness(1.08)",
              WebkitBackdropFilter: "blur(32px) saturate(200%) brightness(1.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: [
                "0 4px 28px rgba(0,0,0,0.4)",
                "inset 0 1.5px 0 rgba(255,255,255,0.20)",
                "inset 0 -1px 0 rgba(0,0,0,0.20)",
              ].join(", "),
              transition: "background 0.4s ease",
            }}
          >
            {/* Specular top sheen */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "999px",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 50%)",
                pointerEvents: "none",
              }}
            />

            <nav
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
                position: "relative",
                zIndex: 1,
              }}
            >
              {routes["/"] && (
                <NavLink href="/" label="Home" selected={pathname === "/"} />
              )}
              {routes["/about"] && (
                <NavLink href="/about" label={about.label} selected={pathname === "/about"} />
              )}
              {routes["/efoil-experiences-maldives"] && (
                <NavLink href="/efoil-experiences-maldives" label={efoilExperiences.label} selected={pathname.startsWith("/efoil-experiences-maldives")} />
              )}
              {routes["/blog"] && (
                <NavLink href="/blog" label={blog.label} selected={pathname.startsWith("/blog")} />
              )}
              {routes["/gallery"] && (
                <NavLink href="/gallery" label={gallery.label} selected={pathname.startsWith("/gallery")} />
              )}
              {routes["/events"] && (
                <NavLink href="/events" label={events.label} selected={pathname.startsWith("/events")} />
              )}
              {display.themeSwitcher && (
                <>
                  <div
                    style={{
                      width: "1px",
                      height: "16px",
                      background: "rgba(255,255,255,0.15)",
                      margin: "0 4px",
                      flexShrink: 0,
                    }}
                  />
                  <ThemeToggle />
                </>
              )}
            </nav>
          </div>
        </Row>

        {/* Right spacer */}
        <Flex fillWidth horizontal="end" vertical="center">
          <Flex paddingRight="12" horizontal="end" vertical="center" textVariant="body-default-s" gap="20">
            <Flex s={{ hide: true }}>
              {display.time && <TimeDisplay timeZone={person.location} />}
            </Flex>
          </Flex>
        </Flex>
      </Row>
    </>
  );
};
