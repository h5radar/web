import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, expect, it } from "vitest";

import "@tests/mocks/auth";

import { PracticesPage } from "@/pages/practices/table";

describe("PracticesPage", () => {
  it("get practices page", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <PracticesPage />
        </QueryClientProvider>
      </BrowserRouter>,
    );
    expect(screen.getByText("Columns")).toBeDefined();
  });
});
