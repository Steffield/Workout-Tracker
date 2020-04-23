const router = require("express").Router();
// const db = require("../models");
const Workout = require("../models/workout");
// const mongoose = require("mongoose");

//-----routing-----

    //see api.js getLastWorkout()
    router.get("/api/workouts", (req, res) => {
        Workout.find({})
        // .sort({"day": -1}).limit(1)
        .then(dbWorkoutData =>{
            console.log(dbWorkoutData);
            res.json(dbWorkoutData)
        }).catch(err => {
            res.status(400).json(err)
        })
    })

     // addExercise() 
     router.put("/api/workouts/:id", (req, res ) => {
        const exercise = req.body;
        Workout.findByIdAndUpdate( req.params.id,
            // {
            //     _id: mongoose.ObjectId(params.id)
            // },
            {
                $push: {
                    exercises: exercise
                }
            })
            .then(dbWorkoutData =>{
                console.log(dbWorkoutData);
                res.json(dbWorkoutData)
            }).catch(err => {
                res.status(400).json(err)
            })
          
    });

    // createWorkout()
    router.post("/api/workouts", ({ body }, res) => {
        Workout.create( body )
        .then(dbWorkoutData => {
            res.json(dbWorkoutData);
        })
        .catch (err => {
            res.status(400).json(err);
        })
    })
    
    //getWorkoutsInRange()
    router.get("/api/workouts/range", (req, res) => {
        Workout.find({}).sort({"day": -1}).limit(5)
        .then(dbWorkoutData => {
            res.json(dbWorkoutData)
        }).catch(err => {
            res.status(400).json(err);
        })
    });


//----export router
module.exports = router; 






