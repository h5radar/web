import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import WelcomePage from "@/pages/welcome";

test("WelcomePage", () => {
  render(<WelcomePage />);
  expect(screen.getByText("Welcome back")).toBeDefined();
});
