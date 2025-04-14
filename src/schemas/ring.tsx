import { z } from "zod";

export const ringSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  priority: z.string(),
});
