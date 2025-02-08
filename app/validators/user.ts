import ROLES from '#enums/roles'
import vine from '@vinejs/vine'

export const storeUserValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(1),
    password: vine.string().minLength(1),
    role: vine.enum(ROLES).optional(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(1).optional(),
    password: vine.string().minLength(1).optional(),
    role: vine.enum(ROLES).optional(),
  })
)
