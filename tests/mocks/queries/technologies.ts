import { vi } from "vitest";

vi.mock("@/queries/technology", () => ({
  useGetTechnology: vi.fn(() => ({
    data: {
      id: "1",
      title: "AWS Athena",
      description: "AWS Athena description",
      website: "",
      moved: 0,
      active: true,
    },
    isLoading: false,
    isError: false,
    error: null,
  })),

  useUpdateTechnology: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
  })),
}));
