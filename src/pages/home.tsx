import { IconLoader } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";

import { useGetLicenseByCompliance } from "@/queries/license";
import { useSeedRadarUser } from "@/queries/radar-user";

import { CustomPieChart } from "@/components/pie-chart";

export default function HomePage() {
  const auth = useAuth();
  const queryClient = useQueryClient();

  const { data: licensesData, isLoading: isLoading } = useGetLicenseByCompliance(auth);

  const { mutate: seedCompliances, isPending: isPending1 } = useSeedRadarUser(auth, queryClient);
  useEffect(() => {
    seedCompliances();
  }, [auth, seedCompliances]);

  if (isPending1) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[20vh] w-full">
          <IconLoader data-testid="loading-byCompliance" className="animate-spin" />
        </div>
      ) : licensesData ? (
        <CustomPieChart
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
