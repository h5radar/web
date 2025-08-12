import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, expect, it } from "vitest";

import "@tests/mocks/auth";

import { LicensesPage } from "@/pages/licenses/table";

describe("LicensesPage", () => {
  it("get licenses page", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <LicensesPage />
        </QueryClientProvider>
      </BrowserRouter>,
    );
    expect(screen.getByText("Columns")).toBeDefined();
  });
});
