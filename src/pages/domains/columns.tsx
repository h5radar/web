import { IconDotsVertical } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Link } from "react-router";
import { z } from "zod";

import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu";

import { domainSchema } from "@/schemas/domain";

export const useDomainColumns = (handleDelete: (id: string) => void): ColumnDef<z.infer<typeof domainSchema>>[] =>
  useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => <div className="w-64 overflow-hidden text-ellipsis">{row.original.title}</div>,
        enableHiding: false,
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => <div className="w-64 overflow-hidden text-ellipsis">{row.original.description}</div>,
      },
      {
        accessorKey: "position",
        header: "Position",
        cell: ({ row }) => (
          <div className="w-32">
            <Badge variant="outline" className="text-muted-foreground px-1.5">
              {row.original.position}
            </Badge>
          </div>
        ),
      },
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
              <Link to={`/domains/edit/${row.id}`}>
                <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={() => handleDelete(row.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [handleDelete],
  );
