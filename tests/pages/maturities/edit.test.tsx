import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, expect, it } from "vitest";

import "@tests/mocks/auth";
import "@tests/mocks/queries/maturities";

import MaturitiesEditPage from "@/pages/maturities/edit";

describe("MaturitiesEditPage", () => {
  it("get maturities edit page", async () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <MaturitiesEditPage />
        </QueryClientProvider>
      </BrowserRouter>,
    );
    window.history.pushState({}, "Edit Maturities", "/maturities/edit/1");
    await waitFor(() => {
      expect(screen.getByPlaceholderText("id")).toBeDefined();
      expect(screen.getByDisplayValue("1")).toBeTruthy();
      expect(screen.getByPlaceholderText("title")).toBeDefined();
      expect(screen.getByDisplayValue("ADOPT")).toBeTruthy();
      expect(screen.getByPlaceholderText("description")).toBeDefined();
      expect(
        screen.getByDisplayValue(
          "Technologies we have high confidence in to serve our purpose, also in large scale. Technologies with a usage culture in production environment, low risk and recommended to be widely used.",
        ),
      ).toBeTruthy();
      expect(screen.getByText("Position")).toBeDefined();
      expect(screen.getByDisplayValue("0")).toBeTruthy();
      expect(screen.getByText("Color")).toBeDefined();
      expect(screen.getByDisplayValue("#93c47d")).toBeTruthy();
    });
  });
});
