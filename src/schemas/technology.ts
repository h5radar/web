import { z } from "zod";

export const technologySchema = z.object({
  id: z.preprocess((val) => Number(val), z.number()),
  title: z.string().min(3, {
    message: "Title must be at least 3 characters",
  }),
  description: z.string().min(3, {
    message: "Description must be at least 3 characters",
  }),
  website: z.string().optional(),
  moved: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .min(-1, {
        message: "Moved must be greater or equal than -1",
      })
      .max(1, {
        message: "Moved must be less or equal than 1",
      }),
  ),
  active: z.boolean(),
});
