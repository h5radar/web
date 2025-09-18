import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import z from "zod";

import { ChartConfig } from "@/ui/chart";

import { licenseSchemaChart, licenseSchemaStatistic } from "@/schemas/license";

import { useSeedCompliances } from "@/queries/compliance";
import { useSeedDomains } from "@/queries/domain";
import { useGetLicenseByCompliance, useSeedLicenses } from "@/queries/license";
import { useSeedMaturities } from "@/queries/maturity";
import { useSeedPractices } from "@/queries/practice";
import { useSeedTechnologies } from "@/queries/technology";

import { ChartPie } from "@/components/pie-chart";

export default function HomePage() {
  const auth = useAuth();
  const queryClient = useQueryClient();

  const { mutate: seedCompliances, isPending: isPending1 } = useSeedCompliances(auth, queryClient);
  const { mutate: seedLicenses, isPending: isPending2 } = useSeedLicenses(auth, queryClient);
  const { mutate: seedPractices, isPending: isPending3 } = useSeedPractices(auth, queryClient);
  const { mutate: seedMaturities, isPending: isPending4 } = useSeedMaturities(auth, queryClient);
  const { mutate: seedDomains, isPending: isPending5 } = useSeedDomains(auth, queryClient);
  const { mutate: seedTechnologies, isPending: isPending6 } = useSeedTechnologies(auth, queryClient);
  const { data: chartData, isLoading: isLoading } = useGetLicenseByCompliance(auth);

  useEffect(() => {
    seedCompliances();
    seedLicenses();
    seedPractices();
    seedMaturities();
    seedDomains();
    seedTechnologies();
  }, [auth, seedCompliances, seedLicenses, seedPractices, seedMaturities, seedDomains, seedTechnologies]);

  if (isPending1 || isPending2 || isPending3 || isPending4 || isPending5 || isPending6 || isLoading) {
    return <h1>Loading...</h1>;
  }
  // TODO - add constant statictic
  const chartConfig = {
    count: {
      label: "Count",
    },
    High: {
      label: "High",
      color: "var(--chart-1)",
    },
    Medium: {
      label: "Medium",
      color: "var(--chart-2)",
    },
    Low: {
      label: "Low",
      color: "var(--chart-3)",
    },
  } satisfies ChartConfig;

  const extendedChartData: z.infer<typeof licenseSchemaChart>[] = (chartData ?? [])
    // .filter((item: z.infer<typeof licenseSchemaStatistic>) => chartConfig[item.title]) // TODO to discus
    .map((item: z.infer<typeof licenseSchemaStatistic>) => ({
      title: item.title,
      count: item.count,
      fill: `var(--color-${item.title})`, //`var(--chart-${key + 1})`,
    }));

  if (!chartData || chartData.length === 0) {
    return <h1>No data available</h1>;
  }
  return (
    <>
      <h1 className="text-3xl font-bold underline mb-2">Home</h1>
      <ChartPie
        chartData={extendedChartData}
        chartConfig={chartConfig}
        header="Licenses"
        dataKey="count"
        nameKey="title"
        stroke="0"
      />
    </>
  );
}
