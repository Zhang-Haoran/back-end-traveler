require('dotenv').config();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  port: process.env.PORT || 8000,
  api: {
    prefix: process.env.API_PREFIX || '/api/v1',
  },

  // mongoConnection:'mongodb+srv://besttraveller001:tseb12345@cluster0.0ksxn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  mongoConnection: process.env.CONNECTION_STRING + process.env.DB_NAME,
};


