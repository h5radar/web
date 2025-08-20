import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, expect, it } from "vitest";

import "@tests/mocks/auth";
import "@tests/mocks/queries/practice";

import EditPracticePage from "@/pages/practices/edit";

describe("EditPracticePage", () => {
  it("get practices edit page", async () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <EditPracticePage />
        </QueryClientProvider>
      </BrowserRouter>,
    );
    window.history.pushState({}, "Edit Practice", "/practices/edit/1");
    await waitFor(() => {
      expect(screen.getByPlaceholderText("id")).toBeDefined();
      expect(screen.getByDisplayValue("1")).toBeTruthy();
      expect(screen.getByPlaceholderText("title")).toBeDefined();
      expect(screen.getByDisplayValue("Code coverage title")).toBeTruthy();
      expect(screen.getByPlaceholderText("description")).toBeDefined();
      expect(screen.getByDisplayValue("Code coverage description")).toBeTruthy();
      expect(screen.getByText("Active")).toBeDefined();
      expect(screen.getByDisplayValue("on")).toBeTruthy();
    });
  });
});
