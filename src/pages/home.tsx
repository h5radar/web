import { IconLoader } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useAuth } from "react-oidc-context";

import { Button } from "@/ui/button";

import { DEFAULT_QUERY_PARAM } from "@/constants/query-defaults";

import { useGetLicenseByCompliance } from "@/queries/license";
import { useSeedRadarUser } from "@/queries/radar-user";
import { useGetTechnologies } from "@/queries/technology";

import { CustomPieChart } from "@/components/pie-chart";

export default function HomePage() {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const queryParams = DEFAULT_QUERY_PARAM;

  const { data: technologies, isLoading: isLoadingTechnologies } = useGetTechnologies(auth, queryParams);
  const { data: licensesData, isLoading: isLoadingLicenses } = useGetLicenseByCompliance(auth);
  const { mutate: seedCompliances, isPending: isSeeding } = useSeedRadarUser(auth, queryClient);

  const handleLoadData = useCallback(() => seedCompliances(), [seedCompliances]);

  if (isSeeding) {
    <div className="flex justify-center items-center h-[50vh]">
      <IconLoader className="animate-spin w-8 h-8" />
      <span className="ml-2 text-lg font-medium">Seeding data...</span>
    </div>;
  }

  const noData =
    !isLoadingTechnologies &&
    !isLoadingLicenses &&
    (technologies?.content?.length ?? 0) === 0 &&
    (licensesData?.length ?? 0) === 0;

  if (noData) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
        <p>No data available yet.</p>
        <Button onClick={handleLoadData}>Seed Data</Button>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {isLoadingLicenses ? (
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
