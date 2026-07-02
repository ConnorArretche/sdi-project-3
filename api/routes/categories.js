const express = require('express');
const router = express.Router({mergeParams: true});
const knex = require('knex')(require('../../knexfile')["development"]);

router.get('/', (req,res) => {
  knex('categories')
  .select('name')
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
        const category = await knex('categories')
            .where({id})
            .first();
            if(!category){
                return res.status(404).json({error: 'Category Not Found'})
            }
            res.json(category)
        }
                catch (err) {
                    res.status(500).json({error: err.message})
                }
            })


router.post('/', async (req, res) => {
    const {name} = req.body;
    if(!name){
        return res.status(400).json({error: 'Category Name Required'})
    }
    try {
        const [newCategory] = await knex('categories')
        .insert({name})
        .returning('id');
        res.status(201).json({message: 'Category Added', categoryId: newCategory})
    } catch(error){
        res.status(500).json({
            error: 'Entry Failed',
            details: error.message
        })
    }
})

router.put('/:id', async (req,res) => {
    const {id} = req.params;
    const {name} = req.body;
    try {
        const count = await knex('categories')
        .where({id:id})
        .update({name})
        if (count > 0){
            res.status(200).json({message: `Category ${id} updated`})
        } else {
            res.status(404).json({error: 'Category Not Found. Cannot update'})
        }
    } catch (error) {
        res.status(500).json({error: 'Database Error', details: error.message})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const deletedCount = await knex('categories')
        .where({id})
        .del();
        if (deletedCount > 0){
            res.status(200).json({message: 'Category Deleted'})
        } else {
            res.status(404).json({message: 'Category Cannot Be Found'})
        }
    } catch(error){
        res.status(500).json({error: 'Database Error'})
    }
})

module.exports = router;