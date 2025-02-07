import ROLES from '#enums/roles'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.raw(/* sql */ `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
    this.schema.raw(/* sql */ `
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ROLES') THEN
          CREATE TYPE "ROLES" AS ENUM(
          ${Object.values(ROLES)
            .map((value) => `'${value}'`)
            .join(', ')});
        END IF;
      END
      $$;
      `)
  }

  async down() {
    this.schema.raw(/* sql */ `DROP EXTENSION IF EXISTS "uuid-ossp"`)
    this.schema.raw(/* sql */ `DROP TYPE IF EXISTS "ROLES"`)
  }
}
