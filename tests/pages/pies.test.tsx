import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import PiesPage from "@/pages/pies";

test("PiesPage", () => {
  render(<PiesPage />);
  expect(screen.getByText("Pie charts")).toBeDefined();
});
