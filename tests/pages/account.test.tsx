import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, expect, it} from "vitest";

import AccountPage from "@/pages/account";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 15,
    },
  },
});

describe("AccountPage", () => {
  it("show account page", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AccountPage />
      </QueryClientProvider>,
    );
    expect(screen.getByText("Account")).toBeDefined();
  });
});
