import vine, { SimpleMessagesProvider } from '@vinejs/vine'
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

vine.messagesProvider = new SimpleMessagesProvider({
  'currentPassword.required': 'The current password field must be defined',
  'newPassword.required': 'The new password field must be defined',
  'newPassword.confirmed': 'The new password field and confirm password field must be the same',
  'newPassword.regex':
    'The new password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  'newPassword.minLength': 'The new password must be at least {{ min }} characters long',
})

export const updateProfilePasswordValidator = vine.compile(
  vine.object({
    currentPassword: vine.string().minLength(1),
    newPassword: vine
      .string()
      .minLength(1)
      .confirmed({
        confirmationField: 'confirmPassword',
      })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,}$/)
      .minLength(4),
  })
)
export type UpdateProfilePasswordValidator = Infer<typeof updateProfilePasswordValidator>
export const destroyProfileValidator = vine.compile(
  vine.object({
    password: vine.string().minLength(1),
  })
)
