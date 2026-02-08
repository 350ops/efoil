import { Column, Grid, Row, SmartLink, Text } from "@once-ui-system/core";
import { person, social } from "@/resources";
import { TrackedSocialIcon } from "./TrackedSocialIcon";
import styles from "./Footer.module.scss";

const footerLinks = [
  {
    heading: "Services",
    links: [
      { label: "eFoil Packages", href: "/work" },
      { label: "Yacht Delivery", href: "/yachts" },
      { label: "Resort Partnership", href: "/resorts" },
      { label: "Partner Network", href: "/partners" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { label: "What Is eFoiling?", href: "/what-is-efoiling" },
      { label: "Safety Guide", href: "/blog/efoil-safety-guide" },
      { label: "Rental vs Buying", href: "/blog/efoil-rental-vs-buying" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Gallery", href: "/gallery" },
      { label: "Maldives Locations", href: "/maldives-atolls" },
    ],
  },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Column as="footer" fillWidth padding="8" horizontal="center">
      {/* Footer Links Grid */}
      <Grid
        columns="3"
        gap="32"
        maxWidth="m"
        fillWidth
        paddingX="16"
        paddingTop="40"
        paddingBottom="24"
        s={{ columns: 1, gap: "24", paddingTop: "32", paddingBottom: "20", paddingX: "12" }}
      >
        {footerLinks.map((section) => (
          <Column key={section.heading} gap="12" s={{ gap: "8" }}>
            <Text variant="label-strong-s" onBackground="neutral-strong" marginBottom="4">
              {section.heading}
            </Text>
            {section.links.map((link) => (
              <SmartLink key={link.href} href={link.href}>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {link.label}
                </Text>
              </SmartLink>
            ))}
          </Column>
        ))}
      </Grid>

      {/* Bottom Bar */}
      <Row
        className={styles.mobile}
        maxWidth="m"
        paddingY="8"
        paddingX="16"
        gap="16"
        horizontal="between"
        vertical="center"
        s={{
          direction: "column",
          horizontal: "center",
          align: "center",
        }}
      >
        <Text variant="body-default-s" onBackground="neutral-strong">
          <Text onBackground="neutral-weak">© {currentYear} /</Text>
          <Text paddingX="4">{person.name}</Text>
          <Text onBackground="neutral-weak">
            {/* Usage of this template requires attribution. Please don't remove the link to Once UI unless you have a Pro license. */}
            / Build your portfolio with{" "}
            <SmartLink href="https://once-ui.com/products/magic-portfolio">Once UI</SmartLink>
          </Text>
        </Text>
        <Row gap="16">
          {social.map(
            (item) =>
              item.link && (
                <TrackedSocialIcon
                  key={item.name}
                  name={item.name}
                  link={item.link}
                  icon={item.icon}
                />
              ),
          )}
        </Row>
      </Row>
      <Row height="80" hide s={{ hide: false }} />
    </Column>
  );
};
