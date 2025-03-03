import vine from '@vinejs/vine'
import type { Infer } from '@vinejs/vine/types'

export const signInValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(1),
    password: vine.string().minLength(1),
  })
)
export type SignInValidator = Infer<typeof signInValidator>

export const signUpValidator = vine.compile(
  vine.object({
    username: vine
      .string()
      .minLength(4)
      .regex(/^[a-z0-9_.]+$/)
      .unique({ column: 'username', table: 'users' }),
    password: vine
      .string()
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,}$/)
      .minLength(4),
  })
)
export type SignUpValidator = Infer<typeof signUpValidator>
