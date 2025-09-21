import z from "zod";

export const chartSchema = z.object({
  fill: z.string(),
  count: z.number(),
  title: z.string(),
});
