import { z } from "zod";

export const segmentSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});
