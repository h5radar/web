import { z } from "zod";

export const teamSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});
