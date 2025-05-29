import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, vi } from "vitest";

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

afterAll(() => {
  vi.restoreAllMocks();
});
