import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { toast } from "sonner";

import { userSchema } from "@/schemas/user";

import { useAppDispatch, useAppSelector } from "@/hooks/use-redux";

import { useDeleteTechnology, useGetTechnologies } from "@/queries/technology";

import { fetchRadarUser } from "@/slices/radar-user";

import { DataTable } from "@/components/data-table";

import { useTechnologyColumns } from "@/pages/technologies/columns";

export const TechnologiesPage = () => {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [queryParams, setQueryParams] = useState({
    page: 1,
    size: 10,
    sort: ["title", "asc"],
  });
  const radarUser = useAppSelector((state) => state.radarUser.user);
  const loadingRadar = useAppSelector((state) => state.radarUser.loading);
  const errorRadar = useAppSelector((state) => state.radarUser.error);

  useEffect(() => {
    if (!auth.user) return;
    const user = userSchema.parse({
      id: 0,
      sub: auth.user?.profile.sub,
      username: auth.user?.profile.preferred_username,
    });
    dispatch(fetchRadarUser({ user, auth }));
  }, [dispatch, auth]);

  useEffect(() => {
    if (errorRadar) {
      toast.error("Error get radar user", {
        description: errorRadar,
      });
    }
  }, [errorRadar]);

  const {
    data: technologies = { content: [], pageable: { pageNumber: 0, pageSize: 10 }, totalElements: 0 },
    isLoading: isLoading,
    isError: isError,
    error: error,
  } = useGetTechnologies(auth, queryParams, radarUser);

  const { mutate: deleteTechnology } = useDeleteTechnology(auth, queryClient);

  const columns = useTechnologyColumns(deleteTechnology);

  const handlePagination = useCallback((page: number, size: number) => {
    setQueryParams((prev) => {
      return { ...prev, page: page + 1, size: size };
    });
  }, []);

  const handleSorting = useCallback((id: string, desc: "asc" | "desc") => {
    return setQueryParams((prev) => {
      return { ...prev, sort: [id, desc], page: 1 };
    });
  }, []);

  const handleFiltering = useCallback((value: string) => {
    return setQueryParams((prev) => {
      return { ...prev, title: value, page: 1 };
    });
  }, []);

  if (isError) {
    return (
      <div>
        <h1>Error getting technologies</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <>
      <DataTable
        isLoading={isLoading || loadingRadar}
        columns={columns}
        data={technologies.content}
        rowCount={technologies.totalElements}
        pageSize={technologies.pageable.pageSize}
        pageIndex={technologies.pageable.pageNumber}
        handlePagination={handlePagination}
        handleSorting={handleSorting}
        handleFiltering={handleFiltering}
        handleDelete={deleteTechnology}
      />
    </>
  );
};
