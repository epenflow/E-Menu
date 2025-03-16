import * as z from "zod";
import type { updatePasswordSchema, updateProfileSchema } from "./schema";

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
