const router = require("express").Router();
const Event = require("../models/Event.model");
const User = require("../models/User.model");
const Comment = require("../models/Comment.Model");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const mongoose = require("mongoose");

// POST, GET, PUT EVENTS

router.get("/join/:userId/:eventId", async (req, res) => {
  const { userId, eventId } = req.params;
  console.log(userId, eventId);
  const joinUser = await User.findByIdAndUpdate(
    userId,
    { $push: { joinEvent: eventId } },
    { new: true }
  ).populate("joinEvent");

  console.log(joinUser);
  res.status(200).json(joinUser);
});

// GET /events -  Retrieves all of the events
router.get("/", (req, res, next) => {
  Event.find()
    .populate("comment")
    .then((allEvents) => res.json(allEvents))
    .catch((err) => res.json(err));
});

router.get("/user-events", isAuthenticated, async (req, res, next) => {
  const findUser = await User.findById(req.payload.user._id).populate("event");
  res.status(200).json(findUser);
});

//  GET /events/:Id -  Retrieves a specific event by id
router.get("/:Id", (req, res, next) => {
  const { Id } = req.params;

  console.log("this is event detail", Id);
  // if (!mongoose.Types.ObjectId.isValid(Id)) {
  //  res.status(400).json({ message: "Specified id is not valid" });
  // return;
  //  }

  // Each Event document has `comment` array holding `_id`s of Comment documents
  // We use .populate() method to get swap the `_id`s for the actual Comment documents
  Event.findById(Id)
    .populate("comment")
    .then((event) => res.status(200).json(event))
    .catch((error) => res.json(error));
});

// PUT  /events/:Id  -  Updates a specific event by id
router.put("/:Id", (req, res, next) => {
  const { Id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(Id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Event.findByIdAndUpdate(Id, req.body, { new: true })
    .then((updatedEvent) => res.json(updatedEvent))
    .catch((error) => res.json(error));
});

// DELETE  /events/:Id  -  Deletes a specific event by id
router.delete("/:Id", (req, res, next) => {
  const { Id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(Id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Event.findByIdAndRemove(Id)
    .then(() => res.json({ message: `Event with ${Id} is removed.` }))
    .catch((error) => res.json(error));
});

//  POST /events  -  Creates a new event
router.post("/", async (req, res, next) => {
  console.log("event route");

  const { name, sport, date, time, location, participants, userId } = req.body;
  console.log(req.body);

  const event = await Event.create({
    name,
    sport,
    date,
    time,
    location,
    participants,
    owner: userId,
  });
  const findUser = await User.findByIdAndUpdate(
    userId,
    { $push: { event: event._id } },
    { new: true }
  );

  res.status(201).json({ message: "Event created" });
});

// Route /events/:id - create comment
router.post("/comments/:id", async (req, res, next) => {
  const { id } = req.params;
  const { title, description, userId } = req.body; // geting the info of the comments
  console.log(req.params);
  console.log(req.body);

  // finding the Event that the user will comment, and we are using the "id"
  const eventFound = await Event.findById(id);

  const newComment = await Comment.create({
    title,
    description,
    user: userId,
    event: id,
  });
  console.log(newComment);
  // Add new comment into array in selected event & user
  eventFound.comment.push(newComment._id);
  await eventFound.save();

  res.status(200).json({ newComment });
});

//  GET /events/:Id -  Retrieves a specific comment by id

module.exports = router;
