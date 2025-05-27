import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import PracticesPage from "@/pages/practices";

test("PracticesPage", () => {
  render(<PracticesPage />);
  expect(screen.getByText("Practices")).toBeDefined();
});
