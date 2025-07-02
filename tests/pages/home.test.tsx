import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "@/pages/home";

describe("HomePage", () => {
  it("get home page", () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <HomePage />
      </QueryClientProvider>,
    );
    // TODO: fixme
    expect(screen.getByText("Loading...")).toBeDefined();
    // expect(screen.getByText("Home")).toBeDefined();
  });
});
