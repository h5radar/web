import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AboutPage from "@/pages/about";

describe("AboutPage", () => {
  it("get about page", () => {
    render(<AboutPage />);
    expect(screen.getByText("About")).toBeDefined();
  });
});
