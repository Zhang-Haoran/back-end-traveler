const dotenv = require('dotenv');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv.config();

module.exports = {
  port: process.env.PORT || 8000,
  api: {
    prefix: process.env.API_PREFIX || '/api/v1',
  },
  mongoConnection:
    'mongodb+srv://test:1234567890@cluster0.egj00.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
};
