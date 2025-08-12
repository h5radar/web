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

  useUpdateLicense: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
  })),
}));
