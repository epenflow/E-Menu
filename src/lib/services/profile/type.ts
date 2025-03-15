import * as z from "zod";
import type { updateProfileSchema } from "./schema";

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
