import { DashboardLayoutClient } from "./DashboardLayoutClient";
import { Provider } from "./provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <DashboardLayoutClient>{children}</DashboardLayoutClient>
    </Provider>
  );
}
