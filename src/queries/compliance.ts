import type { QueryClient } from "@tanstack/query-core";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { AuthContextProps } from "react-oidc-context";
import { NavigateFunction } from "react-router";
import { toast } from "sonner";
import { ZodError, z } from "zod";

import { QUERY_RETRY_COUNT, RADAR_API_URL } from "@/constants/application";
import {
  CREATE_COMPLIANCE,
  DELETE_COMPLIANCE,
  GET_COMPLIANCE,
  GET_COMPLIANCES,
  SEED_COMPLIANCES,
  UPDATE_COMPLIANCE,
} from "@/constants/query-keys";

import { QueryParams } from "@/types/query-params";

import { complianceSchema } from "@/schemas/compliance";
import { pageSchema } from "@/schemas/page";

import { createQueryParams } from "@/lib/query-params";

export const useCreateCompliance = (auth: AuthContextProps, queryClient: QueryClient, navigate: NavigateFunction) => {
  return useMutation<z.infer<typeof complianceSchema>, Error, z.infer<typeof complianceSchema>>({
    mutationFn: async (values: z.infer<typeof complianceSchema>) => {
      const response = await fetch(`${RADAR_API_URL}/compliances`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return complianceSchema.parse(data);
    },
    mutationKey: [CREATE_COMPLIANCE],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_COMPLIANCES] });
      toast.success("Compliance has been created successfully");
      console.log(1);

      navigate("/compliances");
    },
    onError(error) {
      toast.error("Error creating compliance", {
        description: error.message,
      });
    },
  });
};

export const useUpdateCompliance = (auth: AuthContextProps, queryClient: QueryClient, id: string) => {
  return useMutation<z.infer<typeof complianceSchema>, Error, z.infer<typeof complianceSchema>>({
    mutationFn: async (values: z.infer<typeof complianceSchema>) => {
      const response = await fetch(`${RADAR_API_URL}/compliances/${id}`, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return complianceSchema.parse(data);
    },
    mutationKey: [UPDATE_COMPLIANCE],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_COMPLIANCES] });
      queryClient.invalidateQueries({ queryKey: [GET_COMPLIANCE, id] });
      toast.success("Compliance has been updated successfully");
    },
    onError(error) {
      toast.error("Error updating compliance", {
        description: error.message,
      });
    },
  });
};

export const useDeleteCompliance = (auth: AuthContextProps, queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async (rowId: string) => {
      await fetch(`${RADAR_API_URL}/compliances/${rowId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
    },
    mutationKey: [DELETE_COMPLIANCE],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_COMPLIANCES] });
      toast.success("Compliance has been deleted successfully");
    },
    onError(error) {
      toast.error("Error deleting compliance", {
        description: error.message,
      });
    },
  });
};

export const useGetCompliance = (auth: AuthContextProps, id: string) => {
  return useQuery({
    queryKey: [GET_COMPLIANCE, id],
    queryFn: async () => {
      const response = await fetch(`${RADAR_API_URL}/compliances/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return complianceSchema.parse(data);
    },
    meta: {
      errorMessage: "Error getting compliance",
    },
    retry: (count, error) => count < QUERY_RETRY_COUNT && !(error instanceof ZodError),
  });
};

export const useGetCompliances = (auth: AuthContextProps, queryParams: QueryParams) => {
  return useQuery({
    queryKey: [GET_COMPLIANCES, queryParams],
    queryFn: async () => {
      const response = await fetch(`${RADAR_API_URL}/compliances?${createQueryParams({ ...queryParams })}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return pageSchema(complianceSchema).parse(data);
    },
    meta: {
      errorMessage: "Error getting compliances",
    },
    placeholderData: keepPreviousData,
    retry: (count, error) => count < 3 && !(error instanceof ZodError),
  });
};

export const useSeedCompliances = (auth: AuthContextProps, queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async () => {
      await fetch(`${RADAR_API_URL}/compliances/seed`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
    },
    mutationKey: [SEED_COMPLIANCES],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_COMPLIANCES] });
      toast.success("Compliances has been seeded successfully");
    },
    onError(error) {
      toast.error("Error seeding compliances", {
        description: error.message,
      });
    },
  });
};
