import { LabelList, Pie, PieChart, ResponsiveContainer } from "recharts";
import z from "zod";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/ui/chart";

import { chartSchema } from "@/schemas/chart";

import { cn } from "@/lib/utils";

interface ChartPieProps<T extends dataStatistic> {
  data: T[];
  header?: string;
  description?: string;
  footer?: string;
  dataKey: string;
  nameKey: string;
  stroke: string;
  variant?: "single" | "quad";
}
interface dataStatistic {
  count: number;
  title: string;
}

const createChartProps = <T extends dataStatistic>(
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

export function ChartPie<T extends dataStatistic>({
  data,
  header = "PieChart",
  description = "Licences grouped by compliance",
  footer,
  dataKey,
  nameKey,
  stroke,
  variant = "quad",
}: ChartPieProps<T>) {
  const { chartData, chartConfig } = createChartProps(data);
  return (
    <Card className="flex flex-col gap-1">
      <CardHeader className="items-center pb-0">
        <CardTitle>{header}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className={cn(
            "mx-auto w-full",
            variant === "single" && "aspect-square max-h-[75vh]",
            variant === "quad" && "aspect-[4/3] max-h-[35vh]",
          )}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey={dataKey}
                nameKey={nameKey}
                stroke={stroke}
                labelLine={false}
                label={({ payload, cx, cy, midAngle, innerRadius, outerRadius }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      dy={"1.1rem"}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={14}
                      fill="var(--background)"
                    >
                      {payload.count}
                    </text>
                  );
                }}
              >
                <LabelList
                  dataKey={nameKey}
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                  formatter={(value: keyof typeof chartConfig) => chartConfig[value]?.label}
                />
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey={nameKey} />}
                className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
              />
            </PieChart>
          </ResponsiveContainer>
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
