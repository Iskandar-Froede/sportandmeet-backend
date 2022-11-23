const router = require("express").Router();
const Event = require("../models/Event.model");


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

module.exports = router;
