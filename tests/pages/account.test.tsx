import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AccountPage from "@/pages/account";

describe("AccountPage", () => {
  it("get account page", () => {
    render(<AccountPage />);
    expect(screen.getByText("Account")).toBeDefined();
  });
});
