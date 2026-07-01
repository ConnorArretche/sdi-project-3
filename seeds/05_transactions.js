const { faker } = require('@faker-js/faker');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

function createTransactions(rows, accounts, categories){
  let transactionData = [];
  for(let i = 1; i <= rows; i++){
    let randomAccount = accounts[Math.floor(Math.random()* accounts.length)];
    let randomCategory = categories[Math.floor(Math.random() * categories.length)];
    transactionData.push({amount: Number(faker.finance.amount()),
                          description: faker.finance.transactionDescription(),
                          time_stamp: faker.date.between({from: '2026-01-01', to : Date.now()}),
                          account_id: randomAccount.id,
                          category_id: randomCategory.id
  })
  }
  return transactionData;
}

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('transactions').del()
  let accounts = await knex('accounts');
  let categories = await knex('categories');
  await knex('transactions').insert(createTransactions(15, accounts, categories));
};
