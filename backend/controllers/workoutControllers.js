const Workout = require('../models/workout')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

// get specific workout
const getWorkout = async (req, res) => {
    const {id} = req.params
    const workout = await Workout.findOne({_id:id})
    if(!workout){
        res.status(400).json({mssg: 'no workout with this key available'})
    }
    res.status(200).json(workout)
}

// post new workout
const createWorkout = async (req, res) => {
    const {title,load,reps} = req.body
    try{
        const workout = await Workout.create({title,load,reps})
        res.status(200).json(workout)
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

// delete specific workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params
    const workout = await Workout.findOneAndDelete({_id:id})
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such workout'})
    }
    if(!workout){
        return res.status(404).json({error: 'no workout in w/ this id to delete'})
    }
    res.status(200).json(workout)
}

// patch specific workout
const updateWorkout = async (req, res) => {
    const {id} = req.params
    const workout = await Workout.findOneAndUpdate({_id:id}, {...req.body})
    if(!workout){
        return res.status(404).json({error: 'no workout in w/ this id to update'})
    }
    res.status(200).json(workout)
}


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}