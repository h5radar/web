import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import LicensesPage from "@/pages/licenses";

test("LicensesPage", () => {
  render(<LicensesPage />);
  expect(screen.getByText("Licenses")).toBeDefined();
});
