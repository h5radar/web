import z from "zod";

export const chartSchema = z.object({
  title: z.string(),
  count: z.number(),
  fill: z.string(),
});
