import type { QueryClient } from "@tanstack/query-core";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { AuthContextProps } from "react-oidc-context";
import { NavigateFunction } from "react-router";
import { toast } from "sonner";
import { ZodError, z } from "zod";

import { QUERY_RETRY_COUNT, RADAR_API_URL } from "@/constants/application";
import {
  CREATE_LICENSE,
  DELETE_LICENSE,
  GET_LICENSE,
  GET_LICENSES,
  GET_LICENSE_BY_COMPLIANCE,
  SEED_LICENSES,
  UPDATE_LICENSE,
} from "@/constants/query-keys";

import { QueryParams } from "@/types/query-params";

import { aggregateSchema } from "@/schemas/aggregate";
import { licenseSchema, licenseByComplianceSchema } from "@/schemas/license";
import { pageSchema } from "@/schemas/page";

import { createQueryParams } from "@/lib/query-params";

export const useCreateLicense = (auth: AuthContextProps, queryClient: QueryClient, navigate: NavigateFunction) => {
  return useMutation<z.infer<typeof licenseSchema>, Error, z.infer<typeof licenseSchema>>({
    mutationFn: async (values: z.infer<typeof licenseSchema>) => {
      const response = await fetch(`${RADAR_API_URL}/licenses`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return licenseSchema.parse(data);
    },
    mutationKey: [CREATE_LICENSE],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_LICENSES] });
      toast.success("License has been created successfully");
      navigate("/licenses");
    },
    onError(error) {
      toast.error("Error creating license", {
        description: error.message,
      });
    },
  });
};

export const useUpdateLicense = (auth: AuthContextProps, queryClient: QueryClient, id: string) => {
  return useMutation<z.infer<typeof licenseSchema>, Error, z.infer<typeof licenseSchema>>({
    mutationFn: async (values: z.infer<typeof licenseSchema>) => {
      const response = await fetch(`${RADAR_API_URL}/licenses/${id}`, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return licenseSchema.parse(data);
    },
    mutationKey: [UPDATE_LICENSE],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_LICENSES] });
      queryClient.invalidateQueries({ queryKey: [GET_LICENSE, id] });
      toast.success("License has been updated successfully");
    },
    onError(error) {
      toast.error("Error updating license", {
        description: error.message,
      });
    },
  });
};

export const useDeleteLicense = (auth: AuthContextProps, queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async (rowId: string) => {
      await fetch(`${RADAR_API_URL}/licenses/${rowId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
    },
    mutationKey: [DELETE_LICENSE],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_LICENSES] });
      toast.success("License has been deleted successfully");
    },
    onError(error) {
      toast.error("Error deleting license", {
        description: error.message,
      });
    },
  });
};

export const useGetLicense = (auth: AuthContextProps, id: string) => {
  return useQuery({
    queryKey: [GET_LICENSE, id],
    queryFn: async () => {
      const response = await fetch(`${RADAR_API_URL}/licenses/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return licenseSchema.parse(data);
    },
    meta: {
      errorMessage: "Error getting license",
    },
    retry: (count, error) => count < QUERY_RETRY_COUNT && !(error instanceof ZodError),
  });
};

export const useGetLicenseByCompliance = (auth: AuthContextProps) => {
  return useQuery({
    queryKey: [GET_LICENSE_BY_COMPLIANCE],
    queryFn: async () => {
      const response = await fetch(`${RADAR_API_URL}/licenses/by-compliance`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return aggregateSchema(licenseByComplianceSchema).parse(data).content;
    },
    meta: {
      errorMessage: "Error getting license by compliance",
    },
    retry: (count, error) => count < QUERY_RETRY_COUNT && !(error instanceof ZodError),
  });
};

export const useGetLicenses = (auth: AuthContextProps, queryParams: QueryParams) => {
  return useQuery({
    queryKey: [GET_LICENSES, queryParams],
    queryFn: async () => {
      const response = await fetch(`${RADAR_API_URL}/licenses?${createQueryParams({ ...queryParams })}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return pageSchema(licenseSchema).parse(data);
    },
    meta: {
      errorMessage: "Error getting licenses",
    },
    placeholderData: keepPreviousData,
    retry: (count, error) => count < 3 && !(error instanceof ZodError),
  });
};

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
