import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";

import "@tests/mocks/auth";
import "@tests/mocks/queries/home";

import { useGetLicenseByCompliance } from "@/queries/license";

import HomePage from "@/pages/home";

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("get home page while licenses data is loading", () => {
    (useGetLicenseByCompliance as Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <HomePage />
      </QueryClientProvider>,
    );

    expect(screen.getByTestId("loading-byCompliance")).toBeDefined();
  });

  it("get home page when licenses data exists", () => {
    (useGetLicenseByCompliance as Mock).mockReturnValue({
      data: [
        {
          compliance_id: 1,
          title: "High",
          count: 9,
        },
      ],
      isLoading: false,
    });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <HomePage />
      </QueryClientProvider>,
    );

    expect(screen.getByText("Licenses")).toBeDefined();
    expect(screen.getByText("Licenses grouped by compliance")).toBeDefined();
  });

  it("get home page when no data message", () => {
    (useGetLicenseByCompliance as Mock).mockReturnValue({
      data: null,
      isLoading: false,
    });

    render(
      <QueryClientProvider client={new QueryClient()}>
        <HomePage />
      </QueryClientProvider>,
    );

    expect(screen.getByText("No data available")).toBeDefined();
  });
});
