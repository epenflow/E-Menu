import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.raw(/* sql */ `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
  }

  async down() {
    this.schema.raw(/* sql */ `DROP EXTENSION IF EXISTS "uuid-ossp"`)
  }
}
