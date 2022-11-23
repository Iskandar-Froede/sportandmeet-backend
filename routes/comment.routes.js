const router = require("express").Router();
const User = require('../models/User.model');
const Event = require('../models/Event.model');
const Comment = require('../models/Comment.Model');


// GET comment-route
router.get("/", (req, res, next) => {
  res.json("This is comment page");
});


//  POST /api/comments  -  Creates a new comment
//    /comments/comments
router.post('/add', (req, res, next) => {
  const { title, description, created, userId, eventId } = req.body;

  Comment.create({ title, description, created, user: userId, event: eventId })
  .then(newComment => {
    return Comment.findByIdAndUpdate(userId,  {$push: { comments: newComment._id } });
  })
  .then(response => res.json(response))
  .catch(err => res.json(err))
})


module.exports = router;