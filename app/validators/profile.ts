import vine from '@vinejs/vine'
import type { Infer } from '@vinejs/vine/types'

export const updateProfileValidator = vine
  .withMetaData<{
    id?: string
  }>()
  .compile(
    vine.object({
      fName: vine.string().optional(),
      lName: vine.string().optional(),
      username: vine
        .string()
        .regex(/^[a-z0-9_.]+$/)
        .unique(async (db, value, field) => {
          const user = await db
            .from('users')
            .whereNot('id', field.meta.id)
            .where('username', value)
            .first()
          return !user
        }),
      email: vine
        .string()
        .email()
        .unique(async (db, value, field) => {
          const user = await db
            .from('users')
            .whereNot('id', field.meta.id)
            .where('email', value)
            .first()
          return !user
        }),
    })
  )
export type UpdateProfileValidator = Infer<typeof updateProfileValidator>

export const destroyProfileValidator = vine.compile(
  vine.object({
    password: vine.string().minLength(1),
  })
)
