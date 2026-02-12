import { Column } from "@once-ui-system/core";

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Column fillWidth horizontal="center" style={{ minHeight: "100vh" }}>
      {children}
    </Column>
  );
}
