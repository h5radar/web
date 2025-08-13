import { vi } from "vitest";

vi.mock("@/queries/compliance", () => ({
  useGetCompliance: vi.fn(() => ({
    data: {
      id: "1",
      title: "High",
      description: "High compliance level",
      active: true,
    },
    isLoading: false,
    isError: false,
    error: null,
  })),

  useUpdateCompliance: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
  })),
}));
