import type { QueryClient } from "@tanstack/query-core";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { AuthContextProps } from "react-oidc-context";
import { toast } from "sonner";

import { API_URL } from "@/constants/application";
import { DELETE_TECHNOLOGY, GET_TECHNOLOGIES } from "@/constants/query-keys";

import { QueryParams } from "@/types/query-params";

import { createQueryParams } from "@/lib/query-params";

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
