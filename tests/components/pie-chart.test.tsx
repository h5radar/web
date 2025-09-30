import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import "@tests/mocks/auth";

import { ChartPie } from "@/components/pie-chart";

describe("ChartPie", () => {
  const mockData = [
    {
      compliance_id: 1,
      title: "High",
      count: 9,
    },
    {
      compliance_id: 2,
      title: "Medium",
      count: 5,
    },
    {
      compliance_id: 3,
      title: "Low",
      count: 3,
    },
  ];
  it("renders header and description", () => {
    render(
      <ChartPie
        data={mockData}
        dataKey="count"
        nameKey="title"
        stroke="0"
        header="Licenses"
        description="Licenses grouped by compliance"
      />,
    );
    expect(screen.getByText("Licenses")).toBeDefined();
    expect(screen.getByText("Licenses grouped by compliance")).toBeDefined();
  });
});
