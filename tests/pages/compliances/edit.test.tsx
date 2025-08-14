import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, expect, it } from "vitest";

import "@tests/mocks/auth";
import "@tests/mocks/queries/compliance";

import CompliancesEditPage from "@/pages/compliances/edit";

describe("CompliancesEditPage", () => {
  it("get compliances edit page", async () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <CompliancesEditPage />
        </QueryClientProvider>
      </BrowserRouter>,
    );
    window.history.pushState({}, "Edit Compliance", "/compliances/edit/1");
    await waitFor(() => {
      expect(screen.getByPlaceholderText("id")).toBeDefined();
      expect(screen.getByDisplayValue("1"));
      expect(screen.getByPlaceholderText("title")).toBeDefined();
      expect(screen.getByDisplayValue("High"));
      expect(screen.getByPlaceholderText("description")).toBeDefined();
      expect(screen.getByDisplayValue("High compliance level"));
      expect(screen.getByText("Active")).toBeDefined();
      expect(screen.getByDisplayValue("on"));
    });
  });
});
