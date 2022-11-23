const router = require("express").Router();
const Event = require("../models/Event.model");
const User = require('../models/User.model');
const Comment = require('../models/Comment.Model');
const jwt = require("jsonwebtoken");

// Route GET & POST for event

router.get('/', async(req, res, next) => {
    const events = await Event.find()
    res.json( [ ...events ] )
});

router.post('/', async (req, res, next) => {
    const body = req.body
    console.log("htllo")
    const event = await Event.create(body)
  
    res.status(201).json({ ...event })
  });


// Route Post comment

router.post('/:id', isAuthenticated, async(req, res, next) => {
  const { id } = req.params

// Finding the selected event
  const eventFound = await Event.findById(id);

// Finding the user
  const userFound = await User.findById(req.jwtPayload.user._id);

  const { title, description, created } = req.body;

  const comment = await Comment.create({ title, description, created, user: userFound, event: eventFound })


})



module.exports = router;
