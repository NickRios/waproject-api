import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Order', table => {
    table.increments('id').primary();
    table
      .integer('userId')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('User')
      .onDelete('CASCADE');

    table.string('title', 50).notNullable();
    table.string('description', 50).nullable();
    table.integer('amount').notNullable();
    table.decimal('price', 10, 2).notNullable();
    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('Order');
}
