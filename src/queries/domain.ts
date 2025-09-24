import type { QueryClient } from "@tanstack/query-core";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { AuthContextProps } from "react-oidc-context";
import { NavigateFunction } from "react-router";
import { toast } from "sonner";
import { ZodError, z } from "zod";

import { QUERY_RETRY_COUNT, RADAR_API_URL } from "@/constants/application";
import {
  CREATE_DOMAIN,
  DELETE_DOMAIN,
  GET_DOMAIN,
  GET_DOMAINS,
  SEED_DOMAINS,
  UPDATE_DOMAIN,
} from "@/constants/query-keys";

import { QueryParams } from "@/types/query-params";

import { domainSchema } from "@/schemas/domain";
import { pageSchema } from "@/schemas/page";

import { createQueryParams } from "@/lib/query-params";

export const useCreateDomain = (auth: AuthContextProps, queryClient: QueryClient, navigate: NavigateFunction) => {
  return useMutation<z.infer<typeof domainSchema>, Error, z.infer<typeof domainSchema>>({
    mutationFn: async (values: z.infer<typeof domainSchema>) => {
      const response = await fetch(`${RADAR_API_URL}/domains`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return domainSchema.parse(data);
    },
    mutationKey: [CREATE_DOMAIN],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_DOMAINS] });
      toast.success("Domain has been created successfully");
      console.log(1);

      navigate("/domains");
    },
    onError(error) {
      toast.error("Error creating domain", {
        description: error.message,
      });
    },
  });
};

export const useUpdateDomain = (auth: AuthContextProps, queryClient: QueryClient, id: string) => {
  return useMutation<z.infer<typeof domainSchema>, Error, z.infer<typeof domainSchema>>({
    mutationFn: async (values: z.infer<typeof domainSchema>) => {
      const response = await fetch(`${RADAR_API_URL}/domains/${id}`, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return domainSchema.parse(data);
    },
    mutationKey: [UPDATE_DOMAIN],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_DOMAINS] });
      queryClient.invalidateQueries({ queryKey: [GET_DOMAIN, id] });
      toast.success("Domain has been updated successfully");
    },
    onError(error) {
      toast.error("Error updating domain", {
        description: error.message,
      });
    },
  });
};

export const useDeleteDomain = (auth: AuthContextProps, queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async (rowId: string) => {
      await fetch(`${RADAR_API_URL}/domains/${rowId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
    },
    mutationKey: [DELETE_DOMAIN],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_DOMAINS] });
      toast.success("Domain has been deleted successfully");
    },
    onError(error) {
      toast.error("Error deleting domain", {
        description: error.message,
      });
    },
  });
};

export const useGetDomain = (auth: AuthContextProps, id: string) => {
  return useQuery({
    queryKey: [GET_DOMAIN, id],
    queryFn: async () => {
      const response = await fetch(`${RADAR_API_URL}/domains/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return domainSchema.parse(data);
    },
    meta: {
      errorMessage: "Error getting domain",
    },
    retry: (count, error) => count < QUERY_RETRY_COUNT && !(error instanceof ZodError),
  });
};

export const useGetDomains = (auth: AuthContextProps, queryParams: QueryParams) => {
  return useQuery({
    queryKey: [GET_DOMAINS, queryParams],
    queryFn: async () => {
      const response = await fetch(`${RADAR_API_URL}/domains?${createQueryParams({ ...queryParams })}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return pageSchema(domainSchema).parse(data);
    },
    meta: {
      errorMessage: "Error getting domains",
    },
    placeholderData: keepPreviousData,
    retry: (count, error) => count < 3 && !(error instanceof ZodError),
  });
};

export const useSeedDomains = (auth: AuthContextProps, queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async () => {
      await fetch(`${RADAR_API_URL}/domains/seed`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
    },
    mutationKey: [SEED_DOMAINS],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_DOMAINS] });
      toast.success("Domains has been seeded successfully");
    },
    onError(error) {
      toast.error("Error seeding domains", {
        description: error.message,
      });
    },
  });
};
