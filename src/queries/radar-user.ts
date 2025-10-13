import type { QueryClient } from "@tanstack/query-core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthContextProps } from "react-oidc-context";
import { toast } from "sonner";
import { ZodError } from "zod";

import { QUERY_RETRY_COUNT, RADAR_API_URL } from "@/constants/application";
import {
  GET_COMPLIANCES,
  GET_DOMAINS,
  GET_LICENSES,
  GET_LICENSE_BY_COMPLIANCE,
  GET_MATURITIES,
  GET_PRACTICES,
  GET_PRODUCTS,
  GET_SEED,
  GET_TECHNOLOGIES,
  SEED_ALL,
} from "@/constants/query-keys";

import { radarUserSchema } from "@/schemas/radar-user";

export const useSeedRadarUser = (auth: AuthContextProps, queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${RADAR_API_URL}/radar-users/seed`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || response.statusText);
      }
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
        GET_SEED,
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

export const useGetSeed = (auth: AuthContextProps) =>
  useQuery({
    queryKey: [GET_SEED],
    queryFn: async () => {
      const response = await fetch(`${RADAR_API_URL}/radar-users/0`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return radarUserSchema.parse(data);
    },
    meta: {
      errorMessage: "Error getting seed",
    },
    retry: (count, error) => count < QUERY_RETRY_COUNT && !(error instanceof ZodError),
  });
