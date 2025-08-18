import { vi } from "vitest";

vi.mock("@/queries/domain", () => ({
  useGetDomain: vi.fn(() => ({
    data: {
      id: "1",
      title: "Languages",
      description: "Programming languages we use",
      position: 0,
    },
    isLoading: false,
    isError: false,
    error: null,
  })),

  useUpdateDomain: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
  })),
}));
