import vine from '@vinejs/vine'
import type { Infer } from '@vinejs/vine/types'

export const signInValidator = vine.compile(
  vine.object({
    email: vine.string().email().minLength(1),
    password: vine.string().minLength(1),
  })
)
export type SignInValidator = Infer<typeof signInValidator>

export const signUpValidator = vine.compile(
  vine.object({
    fName: vine.string().minLength(1).maxLength(100),
    lName: vine.string().minLength(1).maxLength(100),
    username: vine
      .string()
      .minLength(4)
      .regex(/^[a-z0-9_.]+$/)
      .unique({ column: 'username', table: 'users' })
      .maxLength(100),
    email: vine.string().email().minLength(1).maxLength(100),
    password: vine
      .string()
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,}$/)
      .minLength(4),
  })
)
export type SignUpValidator = Infer<typeof signUpValidator>
