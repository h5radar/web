import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";

import "@tests/mocks/auth";

import { useGetLicenseByCompliance } from "@/queries/license";

import HomePage from "@/pages/home";

vi.mock("@/queries/license", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/queries/license")>();
  return {
    ...actual,
    useGetLicenseByCompliance: vi.fn(),
  };
});

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loader when licensesData is loading", () => {
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

  it("renders ChartPie when licensesData exists", () => {
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

  it("renders no data message", () => {
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
