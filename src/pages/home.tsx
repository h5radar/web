import { IconLoader } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

import { useSeedCompliances } from "@/queries/compliance";
import { useSeedDomains } from "@/queries/domain";
import { useGetLicenseByCompliance, useSeedLicenses } from "@/queries/license";
import { useSeedMaturities } from "@/queries/maturity";
import { useSeedPractices } from "@/queries/practice";
import { useSeedTechnologies } from "@/queries/technology";

import { ChartPie, createChartProps } from "@/components/pie-chart";

export default function HomePage() {
  const auth = useAuth();
  const queryClient = useQueryClient();

  const { mutate: seedCompliances, isPending: isPending1 } = useSeedCompliances(auth, queryClient);
  const { mutate: seedLicenses, isPending: isPending2 } = useSeedLicenses(auth, queryClient);
  const { mutate: seedPractices, isPending: isPending3 } = useSeedPractices(auth, queryClient);
  const { mutate: seedMaturities, isPending: isPending4 } = useSeedMaturities(auth, queryClient);
  const { mutate: seedDomains, isPending: isPending5 } = useSeedDomains(auth, queryClient);
  const { mutate: seedTechnologies, isPending: isPending6 } = useSeedTechnologies(auth, queryClient);
  const { data: licensesData, isLoading: isLoading } = useGetLicenseByCompliance(auth);

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

  const { chartData, chartConfig } = createChartProps(licensesData ?? []);

  return (
    <>
      <h1 className="text-3xl font-bold underline mb-2">Home</h1>
      {isLoading ? (
        <IconLoader className="animate-spin" />
      ) : licensesData && chartData && chartConfig ? (
        <ChartPie
          chartData={chartData}
          chartConfig={chartConfig}
          dataKey="count"
          nameKey="title"
          header="Licenses"
          stroke="0"
        />
      ) : (
        <h3>No data available</h3>
      )}
    </>
  );
}
