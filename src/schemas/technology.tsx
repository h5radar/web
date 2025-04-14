import { z } from "zod";

export const technologySchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  website: z.string().optional(),
  moved: z.number(),
  active: z.boolean(),
});

export const technologyFormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters",
  }),
  description: z.string().min(3, {
    message: "Description must be at least 3 characters",
  }),
  website: z.string().min(3, {
    message: "Website must be at least 3 characters",
  }),
  moved: z
    .number()
    .min(-1, {
      message: "Moved must be greater or equal than -1",
    })
    .max(1, {
      message: "Moved must be less or equal than 1",
    }),
  active: z.boolean(),
});
