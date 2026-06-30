/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('user_accounts', table => {
        table.integer('user_id').references('id').inTable('users').notNullable();
        table.integer('account_id').references('id').inTable('accounts').notNullable();
        table.unique(['user_id', 'account_id']);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user_accounts');
};
