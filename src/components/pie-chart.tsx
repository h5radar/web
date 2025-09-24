import { Pie, PieChart } from "recharts";
import z from "zod";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/ui/chart";

import { chartSchema } from "@/schemas/chart";

interface ChartPieProps<T> {
  chartData: T[];
  chartConfig: ChartConfig;
  header?: string;
  description?: string;
  footer?: string;
  dataKey: string;
  nameKey?: string;
  stroke: string;
}
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
export function ChartPie<T>({
  chartData,
  chartConfig,
  header = "PieChart",
  description = "Data view as a pie chart",
  footer,
  dataKey,
  nameKey,
  stroke,
}: ChartPieProps<T>) {
  return (
    <Card className="flex flex-col gap-1">
      <CardHeader className="items-center pb-0">
        <CardTitle>{header}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square min-h-[5vh] max-h-[75vh] w-full">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey={dataKey} nameKey={nameKey} stroke={stroke} />
          </PieChart>
        </ChartContainer>
      </CardContent>
      {footer ? (
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="text-muted-foreground leading-none">{footer}</div>
        </CardFooter>
      ) : null}
    </Card>
  );
}
