import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, expect, it } from "vitest";

import "@tests/mocks/auth";

import NewTechnologyPage from "@/pages/technologies/new";

describe("NewTechnologyPage", () => {
  it("get technology new page", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <NewTechnologyPage />
        </QueryClientProvider>
      </BrowserRouter>,
    );
    expect(screen.getByPlaceholderText("id")).toBeDefined();
    expect(screen.getByPlaceholderText("title")).toBeDefined();
    expect(screen.getByPlaceholderText("description")).toBeDefined();
    expect(screen.getByText("Active")).toBeDefined();
  });
});
