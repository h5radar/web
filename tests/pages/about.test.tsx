import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import AboutPage from "@/pages/about";

test("AboutPage", () => {
  render(<AboutPage />);
  expect(screen.getByText("About")).toBeDefined();
});
