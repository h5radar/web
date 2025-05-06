import { useAuth } from "react-oidc-context";
import { TechnologyTable } from "@/components/technologies/table";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { createQueryParams } from "@/utils/fetched";
import { API_URL } from "@/constants";
import { useCallback, useState } from "react";

export const TechnologiesPage = () => {
  const auth = useAuth();
  const [queryParams, setQueryParams] = useState({
    index: 1,
    size: 10,
    sort: ["title", "asc"],
  });

  const {
    data: technologiesData = { content: [], pageable: { pageNumber: 0, pageSize: 10 }, totalElements: 0 },
    isLoading: isFetchingtechnologiesData,
    isError: isErrorDataList,
    error: errorDataList,
  } = useQuery({
    queryKey: ["get list technologies", JSON.stringify(queryParams)],
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

  if (isErrorDataList) {
    toast("Load error", {
      description: JSON.stringify(errorDataList.message),
    });
  }

  const handleFilterParams = useCallback((columnId: string, value: string) => {
    return setQueryParams((prev) => {
      return { ...prev, [columnId]: value, page: 1 };
    });
  }, []);
  const handleSortingParams = useCallback((id: string, desc: "asc" | "desc") => {
    return setQueryParams((prev) => {
      return { ...prev, sort: [id, desc], page: 1 };
    });
  }, []);
  const handlePaginationParams = useCallback((page: number, size: number) => {
    setQueryParams((prev) => {
      return { ...prev, page: page + 1, size: size };
    });
  }, []);

  return (
    <>
      <TechnologyTable
        data={technologiesData.content}
        handlePagination={handlePaginationParams}
        rowCount={technologiesData.totalElements}
        isLoading={isFetchingtechnologiesData}
        handleSorting={handleSortingParams}
        handleFilter={handleFilterParams}
        pageSize={technologiesData.pageable.pageSize}
        pageIndex={technologiesData.pageable.pageNumber}
      />
    </>
  );
};
