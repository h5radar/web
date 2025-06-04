import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import InvoicesPage from "@/pages/invoices";

describe("InvoicesPage", () => {
  it("get invoices page", () => {
    render(<InvoicesPage />);
    expect(screen.getByText("Invoices")).toBeDefined();
  });
});
