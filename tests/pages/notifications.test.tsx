import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import NotificationsPage from "@/pages/notifications";

test("NotificationsPage", () => {
  render(<NotificationsPage />);
  expect(screen.getByText("Notifications")).toBeDefined();
});
