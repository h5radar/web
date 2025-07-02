import type { QueryClient } from "@tanstack/query-core";
import { useMutation } from "@tanstack/react-query";
import { AuthContextProps } from "react-oidc-context";
import { toast } from "sonner";

import { RADAR_API_URL } from "@/constants/application";
import { GET_LICENSES, SEED_LICENSES } from "@/constants/query-keys";

export const useSeedLicenses = (auth: AuthContextProps, queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async () => {
      await fetch(`${RADAR_API_URL}/licenses/seed`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
    },
    mutationKey: [SEED_LICENSES],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_LICENSES] });
      toast.success("Licenses has been seeded successfully");
    },
    onError(error) {
      toast.error("Error seeding licenses", {
        description: error.message,
      });
    },
  });
};
