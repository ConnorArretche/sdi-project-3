const { faker } = require('@faker-js/faker');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('categories').del()
  await knex('categories').insert([
    { name: 'Food' },
    { name: 'Groceries' },
    { name: 'Travel' },
    { name: 'Gas & Transit' },
    { name: 'Shopping & Retail' },
    { name: 'Utilities' },
    { name: 'Entertainment' },
  ]);
};
