import type { QueryClient } from "@tanstack/query-core";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { AuthContextProps } from "react-oidc-context";
import { toast } from "sonner";

import { NavigateFunction } from "react-router";


import { API_URL } from "@/constants/application";
import { CREATE_TECHNOLOGY, DELETE_TECHNOLOGY, GET_TECHNOLOGIES } from "@/constants/query-keys";

import { QueryParams } from "@/types/query-params";

import { createQueryParams } from "@/lib/query-params";
import { z } from "zod";
import { technologySchema } from "@/schemas/technology.ts";

export const useCreateTechnology = (auth: AuthContextProps, queryClient: QueryClient, navigate: NavigateFunction) => {
  return useMutation<
    z.infer<typeof technologySchema>,
    Error,
    z.infer<typeof technologySchema>
  >({
    mutationFn: async (values: z.infer<typeof technologySchema>) => {
      const response = await fetch(`${API_URL}/technologies`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      return await response.json();
    },
    mutationKey: [CREATE_TECHNOLOGY],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_TECHNOLOGIES] });
      toast.success("Technology has been created successfully");
      navigate("/technologies");
    },
    onError(error) {
      toast.error("Error creating technology", {
        description: error.message,
      });
    },
  });
};

export const useDeleteTechnology = (auth: AuthContextProps, queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async (rowId: string) => {
      await fetch(`${API_URL}/technologies/${rowId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
    },
    mutationKey: [DELETE_TECHNOLOGY],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [GET_TECHNOLOGIES] });
      toast.success("Technology has been deleted successfully");
    },
    onError(error) {
      toast.error("Error deleting technology", {
        description: error.message,
      });
    },
  });
};

export const useGetTechnologies = (auth: AuthContextProps, queryParams: QueryParams) => {
  return useQuery({
    queryKey: [GET_TECHNOLOGIES, queryParams],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/technologies?${createQueryParams({ ...queryParams })}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });
      return await response.json();
    },
    placeholderData: keepPreviousData,
  });
};

