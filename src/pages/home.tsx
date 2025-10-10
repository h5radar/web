import { IconLoader } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useAuth } from "react-oidc-context";

import { Button } from "@/ui/button";

import { useGetLicenseByCompliance } from "@/queries/license";
import { useGetSeed, useSeedRadarUser } from "@/queries/radar-user";

import { CustomPieChart } from "@/components/pie-chart";

export default function HomePage() {
  const auth = useAuth();
  const queryClient = useQueryClient();

  const { data: radarUser, isLoading: isLoadingRadarUser } = useGetSeed(auth, "1"); //maybe sub?
  const { data: licensesData, isLoading: isLoadingLicenses } = useGetLicenseByCompliance(auth);
  const { mutate: seedCompliances, isPending: isSeeding } = useSeedRadarUser(auth, queryClient);

  const handleLoadData = useCallback(() => seedCompliances(), [seedCompliances]);

  const noData = !isLoadingRadarUser && !isLoadingLicenses && !radarUser?.seeded;
  if (isSeeding) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <IconLoader className="animate-spin w-8 h-8" />
        <span className="ml-2 text-lg font-medium">Seeding data...</span>
      </div>
    );
  } else if (noData) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
        <p>No data available yet.</p>
        <Button onClick={handleLoadData}>Seed Data</Button>
      </div>
    );
  } else
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
