import * as z from "zod";
import type { FormFieldSchema } from "~/lib/types";
import type { updatePasswordSchema, updateProfileSchema } from "./schema";

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;

export type UpdatePasswordSchemaField<T = undefined> = FormFieldSchema<
  UpdatePasswordSchema,
  T
>;
export type UpdateProfileSchemaField<T = undefined> = FormFieldSchema<
  UpdateProfileSchema,
  T
>;
