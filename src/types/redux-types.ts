import { z } from "zod";

import { userSchema } from "@/schemas/user";

export interface IUserState {
  user: z.infer<typeof userSchema> | null;
  loading: boolean;
  error: string | null;
}
