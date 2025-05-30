import { render, screen } from "@testing-library/react";
import { describe, expect, it} from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter} from "react-router";

import TechnologiesPage from "@/pages/technologies/list";

describe("TechnologiesPage", () => {
  it("get technologies page", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <TechnologiesPage />
        </QueryClientProvider>
      </BrowserRouter>
    );
    expect(screen.getByText("Columns")).toBeDefined();
  });
});
