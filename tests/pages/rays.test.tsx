import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import RaysPage from "@/pages/rays";

test("RaysPage", () => {
  render(<RaysPage />);
  expect(screen.getByText("Rays")).toBeDefined();
});
