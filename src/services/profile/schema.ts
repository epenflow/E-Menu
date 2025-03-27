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

export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "The current password field must be defined"),
    newPassword: z
      .string()
      .regex(
        PATTERN.password,
        "The new password field must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      )
      .min(4, "The new password field must be at least 4 characters long"),
    confirmPassword: z.string(),
  })
  .superRefine((value, ctx) => {
    if (value.newPassword !== value.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "The new password field and confirm password field must be the same",
        path: ["newPassword"],
      });
    }
  });
