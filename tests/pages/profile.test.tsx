import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import ProfilePage from "@/pages/profile";

test("ProfilePage", () => {
  render(<ProfilePage />);
  expect(screen.getByText("Profile")).toBeDefined();
});
