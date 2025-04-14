import { z } from "zod";

export const technologyBlipSchema = z.object({
  id: z.number(),
  radar: z.string(),
  ring: z.string(),
  segment: z.string(),
  technology: z.string(),
});
