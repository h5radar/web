import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, vi } from "vitest";
import { expect } from "vitest";

expect.extend(matchers);

// Mock getBoundingClientRect to return fake sizes
Element.prototype.getBoundingClientRect = function () {
  return {
    width: 400,
    height: 300,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    x: 0,
    y: 0,
    toJSON() {},
  };
};

afterEach(() => {
  cleanup();
});

afterAll(() => {
  vi.restoreAllMocks();
});

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});
