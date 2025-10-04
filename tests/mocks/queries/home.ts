import { vi } from "vitest";

vi.mock("@/queries/license", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/queries/license")>();
  return {
    ...actual,
    useGetLicenseByCompliance: vi.fn(),
  };
});
