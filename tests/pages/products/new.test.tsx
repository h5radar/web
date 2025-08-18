import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, expect, it } from "vitest";

import "@tests/mocks/auth";

import NewProductPage from "@/pages/products/new";

describe("NewProductPage", () => {
  it("get products new page", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <NewProductPage />
        </QueryClientProvider>
      </BrowserRouter>,
    );
    expect(screen.getByPlaceholderText("id")).toBeDefined();
    expect(screen.getByPlaceholderText("title")).toBeDefined();
    expect(screen.getByPlaceholderText("description")).toBeDefined();
  });
});
