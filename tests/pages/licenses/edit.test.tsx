import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, expect, it } from "vitest";

import "@tests/mocks/auth";
import "@tests/mocks/queries/license";

import LicensesEditPage from "@/pages/licenses/edit";

describe("LicensesEditPage", () => {
  it("get licenses edit page", async () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <LicensesEditPage />
        </QueryClientProvider>
      </BrowserRouter>,
    );
    window.history.pushState({}, "Edit License", "/licenses/edit/1");
    await waitFor(() => {
      expect(screen.getByPlaceholderText("id")).toBeDefined();
      expect(screen.getByDisplayValue("1"));
      expect(screen.getByPlaceholderText("title")).toBeDefined();
      expect(screen.getByDisplayValue("MIT license"));
      expect(screen.getByPlaceholderText("description")).toBeDefined();
      expect(screen.getByDisplayValue("MIT license description"));
      expect(screen.getByText("Active")).toBeDefined();
      expect(screen.getByDisplayValue("on"));
    });
  });
});
