const router = require("express").Router();
const Comment = require('../models/Comment.Model');

router.get("/", (req, res, next) => {
  res.json("All good in here");
});


module.exports = router;
