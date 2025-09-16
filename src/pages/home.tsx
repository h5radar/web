import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

import { ChartConfig } from "@/ui/chart";

import { useSeedCompliances } from "@/queries/compliance";
import { useSeedDomains } from "@/queries/domain";
import { useSeedLicenses } from "@/queries/license";
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

  useEffect(() => {
    seedCompliances();
    seedLicenses();
    seedPractices();
    seedMaturities();
    seedDomains();
    seedTechnologies();
  }, [auth, seedCompliances, seedLicenses, seedPractices, seedMaturities, seedDomains, seedTechnologies]);

  if (isPending1 || isPending2 || isPending3 || isPending4 || isPending5 || isPending6) {
    return <h1>Loading...</h1>;
  }

  const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 90, fill: "var(--color-other)" },
  ];
  // TODO - add constant statictic
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "var(--chart-1)",
    },
    safari: {
      label: "Safari",
      color: "var(--chart-2)",
    },
    firefox: {
      label: "Firefox",
      color: "var(--chart-3)",
    },
    edge: {
      label: "Edge",
      color: "var(--chart-4)",
    },
    other: {
      label: "Other",
      color: "var(--chart-5)",
    },
  } satisfies ChartConfig;

  return (
    <>
      <h1 className="text-3xl font-bold underline mb-2">Home</h1>
      <ChartPie
        chartData={chartData}
        chartConfig={chartConfig}
        header="Licenses"
        dataKey="visitors"
        nameKey="browser"
        stroke="0"
      />
    </>
  );
}
