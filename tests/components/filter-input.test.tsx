import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { FilterInput } from "@/components/filter-input";

test("FilterInput", () => {
  render(
    <FilterInput handleFilter={(value: string) => { console.log(value) }} />
  );
  expect(screen.getByText("Java")).toBeDefined();
});
