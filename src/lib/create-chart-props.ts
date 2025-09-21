import z from "zod";

import { ChartConfig } from "@/ui/chart";

import { chartSchema } from "@/schemas/chart";

interface dataStatistic {
  count: number;
  title: string;
}
export const createChartProps = <T extends dataStatistic>(
  data: T[],
  key: string = "Count",
): { chartConfig: ChartConfig; chartData: z.infer<typeof chartSchema>[] } => {
  const chartItem = data.reduce<Record<string, { label: string; color: string }>>((acc, item, index) => {
    acc[item.title] = {
      label: item.title,
      color: `var(--chart-${index + 1})`,
    };
    return acc;
  }, {});
  const chartConfig: ChartConfig = {
    [key]: { label: key },
    ...chartItem,
  };

  const chartData: z.infer<typeof chartSchema>[] = data.map((item) => ({
    title: item.title,
    count: item.count,
    fill: `var(--color-${item.title})`,
  }));
  return { chartConfig, chartData };
};
