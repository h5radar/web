import { vi } from "vitest";

vi.mock("@/queries/license", () => ({
  useGetLicense: vi.fn(() => ({
    data: {
      id: "1",
      title: "MIT license",
      description: "MIT license description",
      active: true,
    },
    isLoading: false,
    isError: false,
    error: null,
  })),

  useGetLicenseByCompliance: vi.fn(() => ({
    data: [
      {
        compliance_id: 1,
        title: "High",
        count: 9,
      },
    ],
    isLoading: false,
    isError: false,
    error: null,
  })),

  useUpdateLicense: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
  })),

  useSeedLicenses: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
  })),
}));
