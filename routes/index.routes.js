const router = require("express").Router();

// localhost:5000/api
router.get("/", (req, res, next) => {
  res.json("All good in here");
  console.log("test");
});

module.exports = router;
