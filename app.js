// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);


const eventRoutes = require("./routes/events.routes");
app.use("/events", eventRoutes);
app.use("/", indexRoutes);

// Add auth-route
const authRouter = require('./routes/auth.routes');
app.use('/auth', authRouter);

// Add Comment-Route
const commentRouter = require('./routes/comment.routes');
app.use('/comments', commentRouter);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
