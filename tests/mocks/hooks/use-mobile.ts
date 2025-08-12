import { vi } from "vitest";

vi.mock("@/hooks/use-mobile.ts", () => ({
  useIsMobile() {
    return false;
  },
}));
