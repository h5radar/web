import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import BillingPage from "@/pages/billing";

test("BillingPage", () => {
  render(<BillingPage />);
  expect(screen.getByText("Billing")).toBeDefined();
});
