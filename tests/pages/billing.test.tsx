import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import BillingPage from "@/pages/billing";

describe("BillingPage", () => {
  it("get billing page", () => {
    render(<BillingPage />);
    expect(screen.getByText("Billing")).toBeDefined();
  });
});
