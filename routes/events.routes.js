const router = require("express").Router();
const Event = require("../models/Event.model");
const User = require('../models/User.model');
const Comment = require('../models/Comment.Model');
const jwt = require("jsonwebtoken");
const isAuthenticated = require('../middlewares/isAuthenticated');

// Route GET & POST for event

router.get('/', async(req, res, next) => {
    const events = await Event.find()
    res.status(200).json( {events} )
});

router.post('/', async (req, res, next) => {
console.log('event route')


  const { name, sport, startTime, endTime, location, participants } = req.body;
   
    console.log(req.body.event)
    const event = await Event.create({
      name: req.body.name,
    //  sport: req.body.sport,
     // startTime: req.body.startTime,
     // endTime: req.body.endTime,
    //  location: req.body.location,
    //  participants: req.body.participants,
    })
  
    res.status(201).json({ message: 'Event created' })
  });


// Route Get & Post comments

router.get('/')

//         /events/:id
router.post('/:id', isAuthenticated, async(req, res, next) => {
  const { id } = req.params
  const { title, description } = req.body;  // geting the info of the comments

// Finding the selected event
  const eventFound = await Event.findById(id);   // finding the Event that the user will comment, and we are using the "id"

  const userFound = await User.findById(req.payload.user._id)

  const newComment = await Comment.create({ title, description, user: userFound, event: eventFound }) // create a comment
  

  eventFound.comment.push(newComment)
  await eventFound.save()

  res.status(200).json({newComment})
})


router.get('/:id', isAuthenticated, async(req, res, next) => {
  const { id } = req.params
  const findComment = await Comment.findById(req.params)

})


module.exports = router;
