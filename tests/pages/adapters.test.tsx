import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AdaptersPage from "@/pages/adapters";

describe("AdaptersPage", () => {
  it("get adapters page", () => {
    render(<AdaptersPage />);
    expect(screen.getByText("Adapters")).toBeDefined();
  });
});
