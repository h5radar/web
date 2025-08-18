import { vi } from "vitest";

vi.mock("@/queries/practice", () => ({
  useGetPractice: vi.fn(() => ({
    data: {
      id: "1",
      title: "Code coverage title",
      description: "Code coverage description",
      active: true,
    },
    isLoading: false,
    isError: false,
    error: null,
  })),

  useUpdatePractice: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
  })),
}));
