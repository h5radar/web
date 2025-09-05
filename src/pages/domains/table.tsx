import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useAuth } from "react-oidc-context";

import { DEFAULT_QUERY_PARAM } from "@/constants/query-defaults";

import { useDeleteDomain, useGetDomains } from "@/queries/domain";

import { DataTable } from "@/components/data-table";

import { useDomainColumns } from "@/pages/domains/columns";

export const DomainsPage = () => {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const [queryParams, setQueryParams] = useState(DEFAULT_QUERY_PARAM);

  const {
    data: domain = { content: [], pageable: { pageNumber: 0, pageSize: 10 }, totalElements: 0 },
    isLoading: isLoading,
    isError: isError,
    error: error,
  } = useGetDomains(auth, queryParams);

  const { mutate: deleteDomain } = useDeleteDomain(auth, queryClient);

  const columns = useDomainColumns(deleteDomain);

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
        <h1>Error getting domains</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <>
      <DataTable
        isLoading={isLoading}
        columns={columns}
        pageLink={"domains"}
        filterPlaceholder="Filter, for example: Languages%..."
        data={domain.content}
        rowCount={domain.totalElements}
        pageSize={domain.pageable.pageSize}
        pageIndex={domain.pageable.pageNumber}
        handlePagination={handlePagination}
        handleSorting={handleSorting}
        handleFiltering={handleFiltering}
        handleDelete={deleteDomain}
      />
    </>
  );
};
