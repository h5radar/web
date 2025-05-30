import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import BiSystemsPage from "@/pages/bi-systems";

describe("BiSystemsPage", () => {
  it("get bi systems page", () => {
    render(<BiSystemsPage />);
    expect(screen.getByText("BI systems")).toBeDefined();
  });
});
