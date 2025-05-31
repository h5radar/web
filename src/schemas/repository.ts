import { z } from "zod";

export const repositorySchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});
