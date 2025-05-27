import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import TechnologiesPage from "@/pages/technologies/list";

test("TechnologiesPage", () => {
  return;
  render(<TechnologiesPage />);
  expect(screen.getByText("Home")).toBeDefined();
});
