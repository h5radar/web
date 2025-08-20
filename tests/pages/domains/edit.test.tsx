import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, expect, it } from "vitest";

import "@tests/mocks/auth";
import "@tests/mocks/queries/domains";

import EditDomainsPage from "@/pages/domains/edit";

describe("EditDomainsPage", () => {
  it("get domains edit page", async () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <EditDomainsPage />
        </QueryClientProvider>
      </BrowserRouter>,
    );
    window.history.pushState({}, "Edit Domains", "/domains/edit/1");
    await waitFor(() => {
      expect(screen.getByPlaceholderText("id")).toBeDefined();
      expect(screen.getByDisplayValue("1")).toBeTruthy();
      expect(screen.getByPlaceholderText("title")).toBeDefined();
      expect(screen.getByDisplayValue("Languages")).toBeTruthy();
      expect(screen.getByPlaceholderText("description")).toBeDefined();
      expect(screen.getByDisplayValue("Programming languages we use")).toBeTruthy();
      expect(screen.getByText("Position")).toBeDefined();
      expect(screen.getByDisplayValue("0")).toBeTruthy();
    });
  });
});
