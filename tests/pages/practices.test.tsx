import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import PracticesPage from "@/pages/practices";

describe("PracticesPage", () => {
  it("get practices page", () => {
    render(<PracticesPage />);
    expect(screen.getByText("Practices")).toBeDefined();
  });
});
