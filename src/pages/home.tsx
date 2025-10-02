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

import { PieChart1 } from "@/components/pie-chart";

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[20vh] w-full">
          <IconLoader data-testid="loading-byCompliance" className="animate-spin" />
        </div>
      ) : licensesData ? (
        <PieChart1
          data={licensesData}
          description="Licenses grouped by compliance"
          dataKey="count"
          nameKey="title"
          header="Licenses"
          stroke="0"
        />
      ) : (
        <h3>No data available</h3>
      )}
    </div>
  );
}
