import { z } from "zod";

export const radarSchema = z.object({
  id: z.number(),
  title: z.string(),
  print_layout: z.boolean(),
  svg_id: z.string(),
  width: z.number(),
  height: z.number(),
  colors: z.object({
    background: z.string(),
    grid: z.string(),
    inactive: z.string(),
  }),
  quadrants: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
    }),
  ),
  rings: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      priority: z.number(),
      color: z.string(),
    }),
  ),
  entries: z.array(
    z.object({
      label: z.string(),
      quadrant: z.number(),
      ring: z.number(),
      moved: z.number(),
      active: z.boolean(),
    }),
  ),
});
