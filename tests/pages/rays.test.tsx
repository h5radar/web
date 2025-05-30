import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import RaysPage from "@/pages/rays";

describe("RaysPage", () => {
  it("get rays page", () => {
    render(<RaysPage />);
    expect(screen.getByText("Rays")).toBeDefined();
  });
});
