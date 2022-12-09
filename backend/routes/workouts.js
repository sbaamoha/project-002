const express = require('express')
const router = express.Router()
const Workout = require('../models/workout')

router.get('/', (req, res) => {
    res.json({msg: 'get all items'})
})

router.get('/:id', (req, res) => {
    res.json({msg: 'get specific item'})
})

router.post('/', async (req, res) => {
    const {title,load, reps} = req.body
    try{
        const workout = await Workout.create({title,load, reps})
        res.status(200).json(workout)
    }catch(err){
        res.status(400).json({error: err.message})
    }
})

router.delete('/:id', (req, res) => {
    res.json({msg: 'delete specific item'})
})

router.patch('/:id', (req, res) => {
    res.json({msg: 'edit an item'})
})

module.exports = router