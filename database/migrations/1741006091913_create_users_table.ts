import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid('id', { primaryKey: true, useBinaryUuid: true })
        .defaultTo(this.raw(/* sql */ `uuid_generate_v4()`))

      table.string('f_name', 100).nullable()
      table.string('l_name', 100).nullable()
      table.string('username', 100).unique().notNullable()
      table.string('email', 150).unique().notNullable()
      table.text('password').notNullable()

      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
