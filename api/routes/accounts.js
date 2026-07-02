const express = require('express');
const router = express.Router({mergeParams: true});
const knex = require('knex')(require('../../knexfile')["development"]);



router.get('/', (req,res) => {
  knex('accounts')
  .join('transactions', 'accounts.id', 'transactions.account_id')
  .select('accounts.id', 'accounts.acct_num', 'accounts.account_type')
  .sum('transactions.amount as balance')
  .groupBy('accounts.id')
  .then(data => res.status(200).json(data))
  .catch(err =>
    res.status(503).json({
        message: 'data not found'
    })
  )
})

router.get('/:id', async(req,res) => {
    try{
        const {id} = req.params;
        const accounts = await knex('accounts')
            .where({id})
            .first();
            if(!accounts){
                return res.status(404).json({error: 'Account Not Found'})
            }
            res.json(accounts)
        }
                catch (err) {
                    res.status(500).json({error: err.message})
                }
            })

router.get('/:id/transactions', async (req,res) => {
    try{
        const {id} = req.params;
        const transactions = await knex('transactions')
            .where({account_id: id})
            if(!transactions){
                return res.status(404).json({error: 'Transactions Not Found'})
            }
            res.json(transactions)
        }
                catch (err) {
                    res.status(500).json({error: err.message})
                }
            })

router.post('/', async (req, res) => {
    const {acct_num, account_type} = req.body;
    if(!acct_num || ! account_type){
        return res.status(400).json({error: 'Account Number, Account Type required'})
    }
    try {
        const [newAcct] = await knex('accounts')
        .insert({acct_num, account_type})
        .returning('id');
        res.status(201).json({message: 'Account Added', accountId: newAcct})
    } catch(error){
        res.status(500).json({
            error: 'Entry Failed',
            details: error.message
        })
    }
})

router.put('/:id', async (req,res) => {
    const {id} = req.params;
    const {acct_num, account_type} = req.body;
    try {
        const count = await knex('accounts')
        .where({id:id})
        .update({acct_num, account_type})
        if (count > 0){
            res.status(200).json({message: `Account ${id} updated`})
        } else {
            res.status(404).json({error: 'Account Not Found. Cannot update'})
        }
    } catch (error) {
        res.status(500).json({error: 'Database Error', details: error.message})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const deletedCount = await knex('accounts')
        .where({id})
        .del();
        if (deletedCount > 0){
            res.status(200).json({message: 'Account Deleted'})
        } else {
            res.status(404).json({message: 'Account Cannot Be Found'})
        }
    } catch(error){
        res.status(500).json({error: 'Database Error'})
    }
})


module.exports = router;