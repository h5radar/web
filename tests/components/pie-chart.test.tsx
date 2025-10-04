import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import "@tests/mocks/auth";
import "@tests/mocks/reacharts-container";

import { PieChart1 } from "@/components/pie-chart";

describe("PieChart1", () => {
  const mockData = [
    { compliance_id: 1, title: "High", count: 9 },
    { compliance_id: 2, title: "Medium", count: 5 },
    { compliance_id: 3, title: "Low", count: 3 },
  ];

  it("renders header and description", () => {
    render(
      <PieChart1
        data={mockData}
        dataKey="count"
        nameKey="title"
        stroke="0"
        header="Licenses"
        variant="single"
        description="Licenses grouped by compliance"
        widthPie={300}
        heightPie={300}
      />,
    );

    expect(screen.getByText("Licenses")).toBeDefined();
    expect(screen.getByText("Licenses grouped by compliance")).toBeDefined();
  });

  it("renders all labels (High, Medium, Low)", () => {
    render(
      <PieChart1
        data={mockData}
        dataKey="count"
        nameKey="title"
        stroke="0"
        header="Licenses"
        variant="quad"
        description="Licenses grouped by compliance"
        widthPie={400}
        heightPie={400}
      />,
    );

    expect(screen.getByText("High")).toBeDefined();
    expect(screen.getByText("Medium")).toBeDefined();
    expect(screen.getByText("Low")).toBeDefined();
  });
});
