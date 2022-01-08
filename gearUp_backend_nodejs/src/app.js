
const express = require('express');
const path = require('path');

require('dotenv').config();

const app = express();

// Middleware
app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );


// Routes
app.use('/api', require("./Routes/auth.routes"));


module.exports = app;
