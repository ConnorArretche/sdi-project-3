/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('transactions', table => {
    table.increments();
    table.decimal('amount').notNullable();
    table.string('description').notNullable();
    table.dateTime('time_stamp').notNullable();
    table.integer('account_id').references('id').inTable('accounts').notNullable();
    table.integer('category_id').references('id').inTable('categories').notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('transactions');
};
