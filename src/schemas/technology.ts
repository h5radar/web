import { z } from "zod";

export const technologySchema = z.object({
  id: z.number(),
  title: z.string().min(3, {
    message: "Title must be at least 3 characters",
  }),
  description: z.string().min(3, {
    message: "Description must be at least 3 characters",
  }),
  website: z.string().optional(),
  moved: z
    .number()
    .min(-1, {
      message: "Moved must be greater or equal than -1",
    })
    .max(1, {
      message: "Moved must be less or equal than 1",
    }),
  active: z.boolean(),
});

const sortSchema = z.object({
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

export function createPaginatedSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
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
}
