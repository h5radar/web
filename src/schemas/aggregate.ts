import z from "zod";

import { sortSchema } from "@/schemas/page";

export const aggregateSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    content: z.array(itemSchema),
    sort: sortSchema,
    total: z.number(),
  });
