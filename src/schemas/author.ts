import { z } from "zod";

export const authorSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});
