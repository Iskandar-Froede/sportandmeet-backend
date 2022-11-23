const { Schema, model, SchemaType } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const commentSchema = new Schema(
  {
    user: {
      type: SchemaType.ObjectId,
      ref: 'User',
    },
    event: {
      type: SchemaType.ObjectId,
      ref: 'Event'
    },
    title: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    created: {
      type: Date,
      default: Date.now
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
