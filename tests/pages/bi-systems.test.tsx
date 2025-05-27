import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import BiSystemsPage from "@/pages/bi-systems";

test("BiSystemsPage", () => {
  render(<BiSystemsPage />);
  expect(screen.getByText("BI systems")).toBeDefined();
});
