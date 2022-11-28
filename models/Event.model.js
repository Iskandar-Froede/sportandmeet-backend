const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "The name of your event is required"],
    },
    sport: {
      type: String,
      // required: [true, 'Email is required.'],
      enum: [
        "Football",
        "Volleyball",
        "Tennis",
        "Cycling",
        "Basketball",
        "Running",
      ],
    },
    date: {
      type: Date,
      // required: [true, 'Start time is required.'],
      trim: true,
    },
    time: {
      type: String,
      // required: [true, 'End time is required.'],
      trim: true,
    },
    location: {
      type: String,
      // required: [true, 'Location is required.'],
      trim: true,
    },
    participants: {
      type: Number,
      // required: [true, 'Number of participants for this event is required.'],
      trim: true,
    },
    comment: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;
