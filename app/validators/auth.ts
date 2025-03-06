import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import type { Infer } from '@vinejs/vine/types'

export const signInValidator = vine.compile(
  vine.object({
    email: vine.string().email().minLength(1),
    password: vine.string().minLength(1),
  })
)
export type SignInValidator = Infer<typeof signInValidator>

vine.messagesProvider = new SimpleMessagesProvider({
  'fName.required': 'The first name field must be defined',
  'fName.maxLength': 'The first name field must not be greater than {{ max }} characters',
  'lName.required': 'The last name field must be defined',
  'lName.maxLength': 'The last name field must not be greater than {{ max }} characters',
  'username.regex':
    'The username field can only contain lowercase letters, numbers, underscores, or periods',
  'password.regex':
    'The password field must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  'password.minLength': 'The password field must be at least {{ min }} characters long',
})
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
    email: vine
      .string()
      .email()
      .unique({ column: 'email', table: 'users' })
      .minLength(1)
      .maxLength(100),
    password: vine
      .string()
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,}$/)
      .minLength(4),
  })
)
export type SignUpValidator = Infer<typeof signUpValidator>
