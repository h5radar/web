import { z } from "zod";

export const sortSchema = z.object({
  empty: z.boolean(),
  sorted: z.boolean(),
  unsorted: z.boolean(),
});

const pageableSchema = z.object({
  pageNumber: z.number(),
  pageSize: z.number(),
  sort: sortSchema,
  offset: z.number(),
  paged: z.boolean().optional(),
  unpaged: z.boolean().optional(),
});

export const pageSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    content: z.array(itemSchema),
    empty: z.boolean(),
    first: z.boolean(),
    last: z.boolean(),
    number: z.number(),
    numberOfElements: z.number(),
    pageable: pageableSchema,
    size: z.number(),
    sort: sortSchema,
    totalElements: z.number(),
    totalPages: z.number(),
  });
