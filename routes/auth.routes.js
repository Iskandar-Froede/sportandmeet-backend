const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const Event = require('../models/Event.model');
const Comment = require('../models/Comment.Model');
const router = require('express').Router();
const saltRounds = 10;

// POST /auth/signup  - Creates a new user in the database
router.post('/signup', (req, res, next) => {
  const { email, password } = req.body;

  if (email === '' || password === '') {
    res.status(400).json({ message: "Provide email and password" });
    return;
  }

// Use regex to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Provide a valid email address.' });
    return;
  }

// Use regex to validate the password format
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      // If the user with the same email already exists, send an error response
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

// If email is unique, proceed to hash the password
const salt = bcrypt.genSaltSync(saltRounds);
const hashedPassword = bcrypt.hashSync(password, salt);

// Create the new user in the database

    return User.create({ email, password: hashedPassword });
    })

    .then((createdUser) => {
      
      const { email, _id } = createdUser;

      const user = { email, _id };


// Send a json response containing the user object
res.status(201).json({ user: user });
})
.catch(err => {
  console.log(err);
  res.status(500).json({ message: "Internal Server Error" })
});
});


// POST  /auth/login - Verifies email and password and returns a JWT
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

// Check if email or password are provided as empty string 
   if (email === '' || password === '') {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

// Check the users collection if a user with the same email exists
User.findOne({ email })
.then((foundUser) => {

  if (!foundUser) {
    // If the user is not found, send an error response
    res.status(401).json({ message: "User not found." })
    return;
  }

// Compare the provided password with the one saved in the database
  const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
 
  if (passwordCorrect) {
// Deconstruct the user object to omit the password
    const { _id, email } = foundUser;

// Create an object that will be set as the token payload
const payload = { _id, email };

// Create and sign the token
const authToken = jwt.sign( 
  payload,
  process.env.TOKEN_SECRET,
  { algorithm: 'HS256', expiresIn: "6h" }
);

// Send the token as the response
res.status(200).json({ authToken: authToken });
}

else {
  res.status(401).json({ message: "Unable to authenticate the user" });
}

})
.catch(err => res.status(500).json({ message: "Internal Server Error" }));
});


module.exports = router