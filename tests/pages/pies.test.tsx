import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import PiesPage from "@/pages/pies";

describe("PiesPage", () => {
  it("get pies page", () => {
    render(<PiesPage />);
    expect(screen.getByText("Pie charts")).toBeDefined();
  });
});
