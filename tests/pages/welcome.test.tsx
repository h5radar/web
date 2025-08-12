import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import "@tests/mocks/auth";

import WelcomePage from "@/pages/welcome";

describe("WelcomePage", () => {
  it("get welcome page", () => {
    render(<WelcomePage />);
    expect(screen.getByText("Welcome back")).toBeDefined();
  });
});
