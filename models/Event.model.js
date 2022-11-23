const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const eventSchema = new Schema(
  {
    eventType: {
        type: String,
        required: [true, 'Email is required.'],
        enum: ['Football', 'Volleyball', 'Tennis', 'Cycling', 'Basketball', 'Running']
      },
    eventStartTime: {
        type: String,
        required: [true, 'Start time is required.'],
        trim: true
      },
    eventEndTime: {
        type: String,
        required: [true, 'End time is required.'],
        trim: true
      },
    eventLocation: {
        type: String,
        required: [true, 'Location is required.'],
        trim: true
      },
    eventSpacesLeft: {
        type: Number,
        required: [true, 'Number of spaces for this event is required.'],
        trim: true
      },
    eventPrice: {
        type: String,
        required: [true, 'Price is required.'],
        trim: true
      },
    eventDetails: {
        type: String,
        required: [true, 'Please include details about your event.'],
        trim: true
      },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;
