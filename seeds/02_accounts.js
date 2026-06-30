const { faker } = require('@faker-js/faker');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

function createAccounts(rows){
  let accountData = [];
  for (let i = 1; i <= rows; i++){
    accountData.push({acct_num: faker.finance.accountNumber(7),
                      account_type: faker.finance.accountName()
                    })
  }
  return accountData;
}

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('accounts').del()
  await knex('accounts').insert(
    createAccounts(15)
  );
};
