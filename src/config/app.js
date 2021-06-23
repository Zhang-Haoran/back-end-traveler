require('express-async-errors');
const dotenv = require('dotenv');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv.config();

module.exports = {
  port: process.env.PORT || 8000,
  api: {
    prefix: process.env.API_PREFIX || '/api/v1',
  },
  mongoConnection:'mongodb://localhost:27017/JR-P3',
};
