import { vi } from "vitest";


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

