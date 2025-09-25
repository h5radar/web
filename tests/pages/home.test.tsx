import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import "@tests/mocks/auth";

import HomePage from "@/pages/home";

describe("HomePage", () => {
  it("get home page", () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <HomePage />
      </QueryClientProvider>,
    );
    expect(screen.getByTestId("loading-icon")).toBeDefined();
  });
});
