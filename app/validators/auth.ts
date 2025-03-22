import vine from '@vinejs/vine'
import type { Infer } from '@vinejs/vine/types'

export const signInValidator = vine.compile(
  vine.object({
    username: vine.string(),
    password: vine.string(),
  })
)
export type SignInValidator = Infer<typeof signInValidator>
