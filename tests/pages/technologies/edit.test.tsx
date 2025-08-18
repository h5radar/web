import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, expect, it } from "vitest";

import "@tests/mocks/auth";
import "@tests/mocks/queries/technologies";

import EditTechnologyPage from "@/pages/technologies/edit";

describe("EditTechnologyPage", () => {
  it("get technologies edit page", async () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <EditTechnologyPage />
        </QueryClientProvider>
      </BrowserRouter>,
    );
    window.history.pushState({}, "Edit Technology", "/technologies/edit/1");
    await waitFor(() => {
      expect(screen.getByPlaceholderText("id")).toBeDefined();
      expect(screen.getByDisplayValue("1")).toBeTruthy();
      expect(screen.getByPlaceholderText("title")).toBeDefined();
      expect(screen.getByDisplayValue("AWS Athena")).toBeTruthy();
      expect(screen.getByPlaceholderText("description")).toBeDefined();
      expect(screen.getByDisplayValue("AWS Athena description")).toBeTruthy();
      expect(screen.getByPlaceholderText("website")).toBeDefined();
      expect(screen.getByDisplayValue("")).toBeTruthy();
      expect(screen.getByText("Moved")).toBeDefined();
      expect(screen.getByDisplayValue("0")).toBeTruthy();
      expect(screen.getByText("Active")).toBeDefined();
      expect(screen.getByDisplayValue("on")).toBeTruthy();
    });
  });
});
