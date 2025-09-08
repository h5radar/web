import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useAuth } from "react-oidc-context";

import { DEFAULT_QUERY_PARAM } from "@/constants/query-defaults";

import { useDeleteProduct, useGetProducts } from "@/queries/product";

import { DataTable } from "@/components/data-table";

import { useProductColumns } from "@/pages/products/columns";

export function ProductsPage() {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const [queryParams, setQueryParams] = useState(DEFAULT_QUERY_PARAM);

  const {
    data: products = { content: [], pageable: { pageNumber: 0, pageSize: 10 }, totalElements: 0 },
    isLoading: isLoading,
    isError: isError,
    error: error,
  } = useGetProducts(auth, queryParams);

  const { mutate: deleteTechnology } = useDeleteProduct(auth, queryClient);
  const columns = useProductColumns(deleteTechnology);

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
        <h1>Error getting products</h1>
        <p>{error.message}</p>
      </div>
    );
  }
  return (
    <>
      <DataTable
        isLoading={isLoading}
        pageLink={"products"}
        filterPlaceholder="Filter, for example: My product%..."
        columns={columns}
        data={products.content}
        rowCount={products.totalElements}
        pageSize={products.pageable.pageSize}
        pageIndex={products.pageable.pageNumber}
        handlePagination={handlePagination}
        handleSorting={handleSorting}
        handleFiltering={handleFiltering}
        handleDelete={deleteTechnology}
      />
    </>
  );
}
