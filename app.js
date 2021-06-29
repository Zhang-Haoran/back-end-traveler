const cors = require('cors');
const express = require('express');
const loader = require('./src/loaders');
const Location = require('./src/models/location');

const app = express();
loader.init(app);



module.exports = app;
