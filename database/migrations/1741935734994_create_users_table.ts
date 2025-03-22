import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid('id', { primaryKey: true, useBinaryUuid: true })
        .defaultTo(this.raw(/* sql */ `uuid_generate_v4()`))
      table.string('f_name').nullable()
      table.string('l_name').nullable()
      table.string('username').notNullable().unique()
      table.string('email').notNullable().unique()
      table.text('password').notNullable()
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
