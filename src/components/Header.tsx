"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import { routes, about, blog, efoilExperiences, learn, gallery, events } from "@/resources";
import styles from "./Header.module.scss";

const navItems = [
  { href: "/", label: "Home", routeKey: "/" as keyof typeof routes, exact: true },
  { href: "/efoil-experiences-maldives", label: "Experiences", routeKey: "/efoil-experiences-maldives" as keyof typeof routes, exact: false },
  { href: "/learn-efoil-maldives", label: "Learn", routeKey: "/learn-efoil-maldives" as keyof typeof routes, exact: false },
  { href: "/yachts", label: "Yachts", routeKey: "/yachts" as keyof typeof routes, exact: false },
  { href: "/resorts", label: "Resorts", routeKey: "/resorts" as keyof typeof routes, exact: false },
  { href: "/audi-foil-board", label: "Audi eFoil", routeKey: "/audi-foil-board" as keyof typeof routes, exact: false },
  { href: "/blog", label: blog.label, routeKey: "/blog" as keyof typeof routes, exact: false },
  { href: "/events", label: events.label, routeKey: "/events" as keyof typeof routes, exact: false },
];

export const Header = () => {
  const pathname = usePathname() ?? "";
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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

  const isActive = (item: (typeof navItems)[number]) => {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  // Hide on /club — it renders its own ClubHeader
  if (pathname === "/club") return null;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo}>
            eFoil Maldives
          </Link>

          {/* Desktop navigation */}
          <nav className={styles.desktopNav}>
            {navItems.map(
              (item) =>
                routes[item.routeKey] && (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={isActive(item) ? styles.navLinkActive : styles.navLink}
                  >
                    {item.label}
                  </Link>
                ),
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
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
            {navItems.map(
              (item) =>
                routes[item.routeKey] && (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={isActive(item) ? styles.mobileLinkActive : styles.mobileLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ),
            )}
          </nav>
        </div>
      )}
    </>
  );
};
