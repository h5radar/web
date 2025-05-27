import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import CobwebsPage from "@/pages/cobwebs";

test("CobwebsPage", () => {
  render(<CobwebsPage />);
  expect(screen.getByText("Cobwebs")).toBeDefined();
});
