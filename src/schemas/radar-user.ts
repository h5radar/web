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
  seededDate: z
    .date()
    .min(new Date(), "The date should be in the future")
    .max(new Date(), "The date must be in the past")
    .nullable(),
});
