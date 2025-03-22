import { PATTERN } from '#constants/index'
import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'fName.maxLength': 'The first name field must not be greater than {{ max }} characters',
  'lName.maxLength': 'The last name field must not be greater than {{ max }} characters',
  'username.regex':
    'The username field can only contain lowercase letters, numbers, underscore, or periods',
})
export const updateProfileValidator = vine.withMetaData<{ id: string }>().compile(
  vine.object({
    fName: vine.string().maxLength(50).nullable(),
    lName: vine.string().maxLength(50).nullable(),
    username: vine
      .string()
      .regex(PATTERN.username)
      .maxLength(20)
      .unique(async (db, value, field) => {
        const row = await db
          .from('users')
          .whereNot('id', field.meta.id)
          .where('username', value)
          .first()

        return !row
      })
      .optional(),
    email: vine
      .string()
      .email()
      .unique(async (db, value, field) => {
        const row = await db
          .from('users')
          .whereNot('id', field.meta.id)
          .where('email', value)
          .first()

        return !row
      })
      .optional(),
  })
)

vine.messagesProvider = new SimpleMessagesProvider({
  'currentPassword.required': 'The current password field must be defined',
  'newPassword.required': 'The new password field must be defined',
  'newPassword.confirmed': 'The new password field and confirm password field must be the same',
  'newPassword.regex':
    'The new password field must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  'newPassword.minLength': 'The new password field must be at least {{ min }} characters long',
})
export const updatePasswordValidator = vine.compile(
  vine.object({
    currentPassword: vine.string(),
    newPassword: vine.string().regex(PATTERN.password).minLength(4).confirmed({
      confirmationField: 'confirmPassword',
    }),
  })
)
