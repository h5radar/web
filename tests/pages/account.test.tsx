import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import AccountPage from "@/pages/account";

test("AccountPage", () => {
  render(<AccountPage />);
  expect(screen.getByText("Account")).toBeDefined();
});
