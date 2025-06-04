import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ProfilePage from "@/pages/profile";

describe("ProfilePage", () => {
  it("get profile page", () => {
    render(<ProfilePage />);
    expect(screen.getByText("Profile")).toBeDefined();
  });
});
