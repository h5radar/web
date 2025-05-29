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

vi.mock("react-oidc-context", () => ({
  useAuth() {
    const { isLoading, isAuthenticated } = {
      isLoading: false,
      isAuthenticated: true,
    };
    return {
      isLoading,
      isAuthenticated,
      signinRedirect: vi.fn(),
      removeUser: vi.fn(),
      settings: {},
      user: { profile: { sub: "5483cbe8-15cd-4bf5-911e-6ca455e533c9", preferred_username: "alice" } },
    };
  },
  hasAuthParams: vi.fn(() => true),
}));

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
