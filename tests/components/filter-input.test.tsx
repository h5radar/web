import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import {FilterInput} from "@/components/filter-input";


test("FilterInput", () => {
  void function handleFilter(value: string){
    console.log(value);
  }

  render(<FilterInput handleFilter={handleFilter} />);
  expect(screen.getByText("Home")).toBeDefined();
});
