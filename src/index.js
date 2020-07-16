'use strict'

// Dependencies
var cookieParser = require('cookie-parser');
const express = require('express');
const router = require('./router');
const helmet = require('helmet');
const morgan = require('morgan');
require("dotenv-safe").config();
const cors = require('cors');
require("./db");

// Create server
const app = express();

// Disable  x powered
app.disable('x-powered-by');

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(router);

module.exports = app;
