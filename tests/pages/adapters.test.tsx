import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import AdaptersPage from "@/pages/adapters";

test("AdaptersPage", () => {
  render(<AdaptersPage />);
  expect(screen.getByText("Adapters")).toBeDefined();
});
