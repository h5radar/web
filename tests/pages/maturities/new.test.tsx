import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, expect, it } from "vitest";

import "@tests/mocks/auth";

import NewMaturitiesPage from "@/pages/maturities/new";

describe("NewMaturitiesPage", () => {
  it("get domains new page", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <NewMaturitiesPage />
        </QueryClientProvider>
      </BrowserRouter>,
    );
    expect(screen.getByPlaceholderText("id")).toBeDefined();
    expect(screen.getByPlaceholderText("title")).toBeDefined();
    expect(screen.getByPlaceholderText("description")).toBeDefined();
    expect(screen.getByText("Position")).toBeDefined();
    expect(screen.getByText("Color")).toBeDefined();
  });
});
