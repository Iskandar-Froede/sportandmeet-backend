const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../models/User.model');
const Event = require('../models/Event.model');
const Comment = require('../models/Comment.Model');
const router = require('express').Router();
const saltRounds = 10;





module.exports = router