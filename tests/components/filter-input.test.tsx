import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FilterInput } from "@/components/filter-input";

describe("FilterInput", () => {
  it("render filter input", () => {
    render(
      <FilterInput
        handleFilter={(value: string) => {
          console.log(value);
        }}
      />,
    );

    expect(screen.getByPlaceholderText("Filter, for example: Text%...")).toBeDefined();
  });
});
