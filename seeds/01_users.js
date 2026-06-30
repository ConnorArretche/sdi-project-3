const { faker } = require('@faker-js/faker');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

function createUsers(rows){
  let userData = [];
  for (let i = 1; i <= rows; i++){
    userData.push({name: faker.person.fullName(),
                  email: faker.internet.email()
                })
  }
  return userData;
}


exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert(
    createUsers(15)
  );
};
