import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tables'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid('id', {
          primaryKey: true,
          useBinaryUuid: true,
        })
        .defaultTo(this.raw('uuid_generate_v4()'))
      table.string('code', 50).notNullable().unique()
      table.integer('capacity').nullable()

      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
