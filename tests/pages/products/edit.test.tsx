import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, expect, it } from "vitest";

import "@tests/mocks/auth";
import "@tests/mocks/queries/product";

import EditProductPage from "@/pages/products/edit";

describe("EditProductPage", () => {
  it("get compliances edit page", async () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <EditProductPage />
        </QueryClientProvider>
      </BrowserRouter>,
    );
    window.history.pushState({}, "Edit Compliance", "/products/edit/1");
    await waitFor(() => {
      expect(screen.getByPlaceholderText("id")).toBeDefined();
      expect(screen.getByDisplayValue("1")).toBeTruthy();
      expect(screen.getByPlaceholderText("title")).toBeDefined();
      expect(screen.getByDisplayValue("Title product")).toBeTruthy();
      expect(screen.getByPlaceholderText("description")).toBeDefined();
      expect(screen.getByDisplayValue("Description product")).toBeTruthy();
    });
  });
});
