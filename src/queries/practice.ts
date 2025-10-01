import type { QueryClient } from "@tanstack/query-core";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { AuthContextProps } from "react-oidc-context";
import { NavigateFunction } from "react-router";
import { toast } from "sonner";
import { ZodError, z } from "zod";

import { QUERY_RETRY_COUNT, RADAR_API_URL } from "@/constants/application";
import { CREATE_PRACTICE, DELETE_PRACTICE, GET_PRACTICE, GET_PRACTICES, UPDATE_PRACTICE } from "@/constants/query-keys";

import { QueryParams } from "@/types/query-params";

import { practiceSchema } from "@/schemas/practice";
import { responseSchema } from "@/schemas/response";

import { createQueryParams } from "@/lib/query-params";

export const useCreatePractice = (auth: AuthContextProps, queryClient: QueryClient, navigate: NavigateFunction) => {
  return useMutation<z.infer<typeof practiceSchema>, Error, z.infer<typeof practiceSchema>>({
    mutationFn: async (values: z.infer<typeof practiceSchema>) => {
      const response = await fetch(`${RADAR_API_URL}/practices`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return practiceSchema.parse(data);
    },
    mutationKey: [CREATE_PRACTICE],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_PRACTICES] });
      toast.success("Practices has been created successfully");
      navigate("/practices");
    },
    onError(error) {
      toast.error("Error creating practice", {
        description: error.message,
      });
    },
  });
};

export const useUpdatePractice = (auth: AuthContextProps, queryClient: QueryClient, id: string) => {
  return useMutation<z.infer<typeof practiceSchema>, Error, z.infer<typeof practiceSchema>>({
    mutationFn: async (values: z.infer<typeof practiceSchema>) => {
      const response = await fetch(`${RADAR_API_URL}/practices/${id}`, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return practiceSchema.parse(data);
    },
    mutationKey: [UPDATE_PRACTICE],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_PRACTICES] });
      queryClient.invalidateQueries({ queryKey: [GET_PRACTICE, id] });
      toast.success("Practices has been updated successfully");
    },
    onError(error) {
      toast.error("Error updating practice", {
        description: error.message,
      });
    },
  });
};

export const useDeletePractice = (auth: AuthContextProps, queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async (rowId: string) => {
      await fetch(`${RADAR_API_URL}/practices/${rowId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
    },
    mutationKey: [DELETE_PRACTICE],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_PRACTICES] });
      toast.success("Practices has been deleted successfully");
    },
    onError(error) {
      toast.error("Error deleting practice", {
        description: error.message,
      });
    },
  });
};

export const useGetPractice = (auth: AuthContextProps, id: string) => {
  return useQuery({
    queryKey: [GET_PRACTICE, id],
    queryFn: async () => {
      const response = await fetch(`${RADAR_API_URL}/practices/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return practiceSchema.parse(data);
    },
    meta: {
      errorMessage: "Error getting practice",
    },
    retry: (count, error) => count < QUERY_RETRY_COUNT && !(error instanceof ZodError),
  });
};

export const useGetPractices = (auth: AuthContextProps, queryParams: QueryParams) => {
  return useQuery({
    queryKey: [GET_PRACTICES, queryParams],
    queryFn: async () => {
      const response = await fetch(`${RADAR_API_URL}/practices?${createQueryParams({ ...queryParams })}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      const data = await response.json();
      return responseSchema(practiceSchema).parse(data);
    },
    meta: {
      errorMessage: "Error getting practices",
    },
    placeholderData: keepPreviousData,
    retry: (count, error) => count < 3 && !(error instanceof ZodError),
  });
};
