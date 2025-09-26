import { LabelList, Pie, PieChart } from "recharts";
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

interface ChartPieProps<T extends dataStatistic> {
  data: T[];
  header?: string;
  description?: string;
  footer?: string;
  dataKey: string;
  nameKey: string;
  stroke: string;
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
}: ChartPieProps<T>) {
  const { chartData, chartConfig } = createChartProps(data);
  return (
    <Card className="flex flex-col gap-1">
      <CardHeader className="items-center pb-0">
        <CardTitle>{header}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square min-h-[5vh] max-h-[75vh] ">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey={dataKey}
              nameKey={nameKey}
              stroke={stroke}
              labelLine={false}
              label={({
                payload,
                ...props
              }: {
                payload: { count: number };
                cx: number;
                cy: number;
                x: number;
                y: number;
                textAnchor: string;
                dominantBaseline: string;
              }) => {
                return (
                  <text
                    cx={props.cx}
                    cy={props.cy}
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    fill="var(--foreground)"
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
