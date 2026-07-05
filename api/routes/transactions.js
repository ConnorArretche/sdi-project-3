const express = require('express');
const router = express.Router({mergeParams: true});
const knex = require('knex')(require('../../knexfile')["development"]);

router.get('/', (req,res) => {
    knex('transactions')
    .join('categories', 'transactions.category_id', 'categories.id')
    .select('transactions.id','amount','description','time_stamp','account_id','category_id', 'categories.name')
    .then(data => res.status(200).json(data))
    .catch(err =>
        res.status(503).json({
            message: 'Transactions not found'
        })
    )
})

router.get('/:id', async (req,res) => {
    try{
        const {id} = req.params;
        const transactions = await knex('transactions')
        .where({id})
        .first();
        if(!transactions){
            return res.status(404).json({error: 'Transaction Not Found'})
        }
        res.json(transactions)
    } catch (err){
        res.status(500).json({error: err.message})
    }
})

router.post('/', async (req,res) => {
    const {amount, description, time_stamp, account_id, category_id} = req.body;
    if(!amount || !description || !time_stamp || !account_id || !category_id){
        return res.status(400).json({error: 'Missing required field'})
    }
    try {
        const [newTransaction] = await knex('transactions')
        .insert({amount, description, time_stamp, account_id, category_id})
        .returning('id')
        res.status(201).json({message: 'Transaction Added', transactionId: newTransaction})
    } catch(error){
        res.status(500).json({
            error: 'Transaction Entry Failed',
            details: error.message
        })
    }
})

router.put('/:id', async (req,res) => {
    const {id} = req.params;
    const {amount, description, time_stamp, account_id, category_id} = req.body;
    try {
        const count = await knex('transactions')
        .where({id:id})
        .update({amount, description, time_stamp, account_id, category_id})
        if (count > 0){
            res.status(200).json({message: `Transaction ${id} updated`})
        } else {
            res.status(404).json({error: 'Transaction Not Found. Cannot Update'})
        }
    } catch (error) {
        res.status(500).json({error: 'Database error', details: error.message})
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const {id} = req.params;
        const deletedCount = await knex('transactions')
        .where({id})
        .del();
        if (deletedCount > 0){
            res.status(200).json({message: 'Transaction Deleted'})
        } else {
            res.status(404).json({message: 'Transaction Not Found'})
        }
    } catch (error) {
        res.status(500).json({error: 'Database Error'})
    }
})

module.exports = router;