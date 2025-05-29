import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import ProfilePage from "@/pages/profile";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 15,
    },
  },
});

describe("ProfilePage", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("show profile page", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ProfilePage />
      </QueryClientProvider>,
    );
    expect(screen.getByText("Profile")).toBeDefined();
  });
});
