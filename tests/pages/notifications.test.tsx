import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import NotificationsPage from "@/pages/notifications";

describe("NotificationsPage", () => {
  it("get notifications page", () => {
    render(<NotificationsPage />);
    expect(screen.getByText("Notifications")).toBeDefined();
  });
});
