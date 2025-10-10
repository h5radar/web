import { z } from "zod";

export const radarUserSchema = z.object({
  id: z.preprocess((val) => Number(val), z.number()),
  sub: z
    .string()
    .min(3, {
      message: "Sub must be at least 3 characters",
    })
    .max(256, {
      message: "Sub must be less than 256 characters",
    }),
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters",
    })
    .max(256, {
      message: "Username must be less than 256 characters",
    }),
  seeded: z.boolean(),
  seededDate: z.preprocess((val: string) => (val ? new Date(val) : null), z.date().nullable()),
});
