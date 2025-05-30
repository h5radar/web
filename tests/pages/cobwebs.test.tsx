import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import CobwebsPage from "@/pages/cobwebs";

describe("CobwebsPage", () => {
  it("get cowbwebs page", () => {
    render(<CobwebsPage />);
    expect(screen.getByText("Cobwebs")).toBeDefined();
  });
});
