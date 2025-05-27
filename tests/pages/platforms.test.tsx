import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import PlatformsPage from "@/pages/platforms";

test("PlatformsPage", () => {
  render(<PlatformsPage />);
  expect(screen.getByText("Platforms")).toBeDefined();
});
