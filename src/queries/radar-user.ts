import type { QueryClient } from "@tanstack/query-core";
import { useMutation } from "@tanstack/react-query";
import { AuthContextProps } from "react-oidc-context";
import { toast } from "sonner";

import { RADAR_API_URL } from "@/constants/application";
import {
  GET_COMPLIANCES,
  GET_DOMAINS,
  GET_LICENSES,
  GET_LICENSE_BY_COMPLIANCE,
  GET_MATURITIES,
  GET_PRACTICES,
  GET_PRODUCTS,
  GET_TECHNOLOGIES,
  SEED_ALL,
} from "@/constants/query-keys";

export const useSeedRadarUser = (auth: AuthContextProps, queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async () => {
      await fetch(`${RADAR_API_URL}/radar-users/seed`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
    },
    mutationKey: [SEED_ALL],
    onSuccess: async () => {
      const keys = [
        GET_COMPLIANCES,
        GET_LICENSES,
        GET_PRACTICES,
        GET_TECHNOLOGIES,
        GET_PRODUCTS,
        GET_MATURITIES,
        GET_DOMAINS,
        GET_LICENSE_BY_COMPLIANCE,
      ];

      await Promise.all(keys.map((key) => queryClient.invalidateQueries({ queryKey: [key] })));

      toast.success("All data has been seeded successfully");
    },
    onError(error) {
      toast.error("Error seeding data", {
        description: error.message,
      });
    },
  });
};
