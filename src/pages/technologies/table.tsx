import { IconDotsVertical } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useCallback, useState } from "react";
import { useAuth } from "react-oidc-context";
import { Link } from "react-router";
import { z } from "zod";

import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

import { technologySchema } from "@/schemas/technology";

import { DataTable } from "@/components/data-table";

import { useDeleteTechnology, useGetTechnologies } from "@/queries/technology.ts";

import { technologyColumns } from "@/pages/technologies/columns";

export const TechnologiesPage = () => {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const [queryParams, setQueryParams] = useState({
    page: 1,
    size: 10,
    sort: ["title", "asc"],
  });

  const columns: ColumnDef<z.infer<typeof technologySchema>>[] = [
    ...technologyColumns,
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
              size="icon"
            >
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <Link to={`/technologies/edit/${row.id}`}>
              <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={() => deleteTechnology(row.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const {
    data: technologies = { content: [], pageable: { pageNumber: 0, pageSize: 10 }, totalElements: 0 },
    isLoading: isLoading,
    isError: isError,
    error: error,
  } = useGetTechnologies(auth, queryParams);

  const { mutate: deleteTechnology } = useDeleteTechnology(auth, queryClient);

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
        <div>{error.message}</div>
      </div>
    );
  }

  return (
    <>
      <DataTable
        isLoading={isLoading}
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
