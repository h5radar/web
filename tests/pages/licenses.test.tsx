import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import LicensesPage from "@/pages/licenses";

describe("LicensesPage", () => {
  it("get licenses page", () => {
    render(<LicensesPage />);
    expect(screen.getByText("Licenses")).toBeDefined();
  });
});
