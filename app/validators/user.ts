import ROLES from '#enums/roles'
import vine from '@vinejs/vine'

export const storeUserValidator = vine.compile(
  vine.object({
    username: vine.string().unique({ table: 'users', column: 'username' }).minLength(1),
    password: vine.string().minLength(1),
    role: vine.enum(ROLES).optional(),
  })
)

export const updateUserValidator = vine.withMetaData<{ userId: string }>().compile(
  vine.object({
    username: vine
      .string()
      .unique(async (db, value, field) => {
        const user = await db
          .from('users')
          .whereNot('id', field.meta.userId)
          .where('username', value)
          .first()
        return !user
      })
      .minLength(1)
      .optional(),
    password: vine.string().minLength(1).optional(),
    role: vine.enum(ROLES).optional(),
  })
)
