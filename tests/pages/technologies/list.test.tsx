import { render, screen } from "@testing-library/react";
import { describe, expect, it} from "vitest";

import TechnologiesPage from "@/pages/technologies/list";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("TechnologiesPage", () => {
  it.skip("show technologies page", () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <TechnologiesPage />
      </QueryClientProvider>,
    );
    expect(screen.getByText("Home")).toBeDefined();
  });
});
