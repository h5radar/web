import { vi } from "vitest";

vi.mock("@/queries/product", () => ({
  useGetProduct: vi.fn(() => ({
    data: {
      id: "1",
      title: "Title product",
      description: "Description product",
    },
    isLoading: false,
    isError: false,
    error: null,
  })),

  useUpdateProduct: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
  })),
}));
