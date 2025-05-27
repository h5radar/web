import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import InvoicesPage from "@/pages/invoices";

test("InvoicesPage", () => {
  render(<InvoicesPage />);
  expect(screen.getByText("Invoices")).toBeDefined();
});
