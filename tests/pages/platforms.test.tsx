import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import PlatformsPage from "@/pages/platforms";

describe("PlatformsPage", () => {
  it("get platforms page", () => {
    render(<PlatformsPage />);
    expect(screen.getByText("Platforms")).toBeDefined();
  });
});
