import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/ui/chart";

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
        <ChartContainer config={chartConfig} className="mx-auto aspect-square min-h-[5vh] max-h-[70vh]  w-full">
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
