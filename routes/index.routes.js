const router = require("express").Router();
const Event = require("../models/Event.model");
const Comment = require('../models/Comment.Model');
const isAuthenticated = require('../middlewares/isAuthenticated')

// localhost:5000/api
router.get("/", (req, res, next) => {
  res.json("All good in here");
  console.log("test")
});



module.exports = router;
