const { faker } = require('@faker-js/faker');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

function createUserAccounts(rows, users, accounts){
  let userAccountData = [];
    while(userAccountData.length < rows){
      let randomUser = users[Math.floor(Math.random() * users.length)];
      let randomAccount = accounts[Math.floor(Math.random() * accounts.length)];
      let newPair = {user_id: randomUser.id, account_id: randomAccount.id};
      let exists = userAccountData.some(pair => pair.user_id === newPair.user_id && pair.account_id === newPair.account_id )
      if (exists){
        continue
      }
      userAccountData.push(newPair);
  }
  return userAccountData;
}

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_accounts').del()
  let users = await knex('users');
  let accounts = await knex('accounts');
  await knex('user_accounts').insert(createUserAccounts(15,users, accounts));
};

