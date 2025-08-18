import { vi } from "vitest";

vi.mock("@/queries/maturity", () => ({
  useGetMaturity: vi.fn(() => ({
    data: {
      id: "1",
      title: "ADOPT",
      description:
        "Technologies we have high confidence in to serve our purpose, also in large scale. Technologies with a usage culture in production environment, low risk and recommended to be widely used.",
      position: 0,
      color: "#93c47d",
    },
    isLoading: false,
    isError: false,
    error: null,
  })),

  useUpdateMaturity: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
  })),
}));
