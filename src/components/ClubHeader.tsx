"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { trackClubCTA, trackInstagram } from "@/lib/analytics";
import styles from "./ClubHeader.module.scss";

const INSTAGRAM_URL = "https://www.instagram.com/efoil.maldives/";

export function ClubHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollToApplication = () => {
    trackClubCTA("header_apply");
    setMenuOpen(false);
    const el = document.getElementById("membership-application");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <div className={styles.logoArea}>
            <Link href="/club" className={styles.logo}>
              Maldives eFoil Club
            </Link>
            <span className={styles.tagline}>Application-only. Limited availability.</span>
          </div>

          {/* Desktop actions */}
          <div className={styles.desktopActions}>
            <button
              type="button"
              className={styles.actionBtnPrimary}
              onClick={scrollToApplication}
            >
              Apply for Membership
            </button>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionBtnSecondary}
              onClick={() => trackInstagram("club_header_concierge")}
            >
              Instagram Concierge
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className={styles.hamburgerIcon} data-open={menuOpen}>
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
              <span className={styles.hamburgerLine} />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className={styles.mobileOverlay} onClick={() => setMenuOpen(false)}>
          <nav className={styles.mobileNav} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.mobileLink}
              onClick={scrollToApplication}
            >
              Apply for Membership
            </button>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileLinkSecondary}
              onClick={() => {
                trackInstagram("club_mobile_concierge");
                setMenuOpen(false);
              }}
            >
              Instagram Concierge
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
