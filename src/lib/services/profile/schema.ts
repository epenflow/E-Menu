import * as z from "zod";
import { PATTERN } from "~/lib/constants";

export const updateProfileSchema = z.object({
  fName: z
    .string()
    .max(50, "The first name field must not be greater than 50 characters"),
  lName: z
    .string()
    .max(50, "The last name field must not be greater than 50 characters"),
  username: z
    .string()
    .max(20, "The username field must not be greater than 20 characters")
    .regex(
      PATTERN.username,
      "The username field can only contain lowercase letters, numbers, underscore, or periods",
    ),
  email: z.string().email("The email field must be a valid email address"),
});
