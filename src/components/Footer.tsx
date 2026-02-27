import { Column, Row, SmartLink, Text } from "@once-ui-system/core";
import { person, social } from "@/resources";
import { TrackedSocialIcon } from "./TrackedSocialIcon";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Column as="footer" fillWidth padding="8" horizontal="center">
      <Row
        className={styles.mobile}
        maxWidth="m"
        paddingY="8"
        paddingX="16"
        gap="16"
        horizontal="between"
        vertical="center"
        s={{ direction: "column", horizontal: "center", }}
      >
        <Row gap="8" vertical="center" wrap s={{ horizontal: "center" }}>
          <Text variant="body-default-s" onBackground="neutral-weak">
            © {currentYear} {person.name}
          </Text>
          <Text variant="body-default-s" onBackground="neutral-weak">·</Text>
          <SmartLink href="/yachts">
            <Text variant="body-default-s" onBackground="neutral-weak">Yacht Delivery</Text>
          </SmartLink>
          <Text variant="body-default-s" onBackground="neutral-weak">·</Text>
          <SmartLink href="/efoil-experiences-maldives">
            <Text variant="body-default-s" onBackground="neutral-weak">Rent</Text>
          </SmartLink>
          <Text variant="body-default-s" onBackground="neutral-weak">·</Text>
          <SmartLink href="/learn-efoil-maldives">
            <Text variant="body-default-s" onBackground="neutral-weak">Learn</Text>
          </SmartLink>
          <Text variant="body-default-s" onBackground="neutral-weak">·</Text>
          <SmartLink href="/efoil-rental-maldives">
            <Text variant="body-default-s" onBackground="neutral-weak">Rental</Text>
          </SmartLink>
          <Text variant="body-default-s" onBackground="neutral-weak">·</Text>
          <SmartLink href="/crew">
            <Text variant="body-default-s" onBackground="neutral-weak">Crew Trips</Text>
          </SmartLink>
          <Text variant="body-default-s" onBackground="neutral-weak">·</Text>
          <SmartLink href="/about">
            <Text variant="body-default-s" onBackground="neutral-weak">About</Text>
          </SmartLink>
          <Text variant="body-default-s" onBackground="neutral-weak">·</Text>
          <SmartLink href="/events">
            <Text variant="body-default-s" onBackground="neutral-weak">Events</Text>
          </SmartLink>
          <Text variant="body-default-s" onBackground="neutral-weak">·</Text>
          <SmartLink href="/audi-foil-board">
            <Text variant="body-default-s" onBackground="neutral-weak">Audi Board</Text>
          </SmartLink>
          <Text variant="body-default-s" onBackground="neutral-weak">·</Text>
          <SmartLink href="/partners">
            <Text variant="body-default-s" onBackground="neutral-weak">Partners</Text>
          </SmartLink>
          <Text variant="body-default-s" onBackground="neutral-weak">·</Text>
          <SmartLink href="/privacy">
            <Text variant="body-default-s" onBackground="neutral-weak">Privacy</Text>
          </SmartLink>
          <Text variant="body-default-s" onBackground="neutral-weak">·</Text>
          <SmartLink href="/terms">
            <Text variant="body-default-s" onBackground="neutral-weak">Terms</Text>
          </SmartLink>
        </Row>
        <Row gap="16" vertical="center">
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
