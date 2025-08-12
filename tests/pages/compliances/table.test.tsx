import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, expect, it } from "vitest";

import "@tests/mocks/auth";

import { CompliancesPage } from "@/pages/compliances/table";

describe("CompliancesPage", () => {
  it("get compliances page", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <CompliancesPage />
        </QueryClientProvider>
      </BrowserRouter>,
    );
    expect(screen.getByText("Columns")).toBeDefined();
  });
});
