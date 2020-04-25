const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
{
  day: {
      type: Date,
      default: Date.now,
  },
  exercises: [
      {
        type:{
          type: String,
          trim: true,
          required: "Enter Cardio or Resistance!"
        },
        name: {
            type: String,
            trim: true,
            required: "Enter exercise name!"
        },
        duration: {
            type: Number,
            required: "Enter the duration of your workout!"
         },

    //only type, name, duration are required for cardio as well as resistance

        distance: Number,
        weight: Number,
        reps: Number,
        sets: Number
      }

  ]
      
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
