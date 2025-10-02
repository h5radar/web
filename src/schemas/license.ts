import { z } from "zod";

import { complianceSchema } from "@/schemas/compliance";

export const licenseSchema = z.object({
  id: z.number(),
  title: z
    .string()
    .min(1, { message: "Title must be at least 3 characters" })
    .max(64, { message: "Title must be less than 64 characters" }),
  description: z
    .string()
    .min(1, { message: "Description must be at least 3 characters" })
    .max(512, { message: "Description must be less than 512 characters" }),
  active: z.boolean(),
  compliance: complianceSchema.nullable().refine((v) => v != null && typeof v.id === "number" && v.id > 0, {
    message: "Compliance is required",
  }),
});

export const licenseByComplianceSchema = z.object({
  compliance_id: z.number(),
  title: z.literal(["High", "Medium", "Low"]),
  count: z.number(),
});
