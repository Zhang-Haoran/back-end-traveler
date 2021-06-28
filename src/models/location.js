const mongoose = require('mongoose');
const city = require('../city')

const locationSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: [true, 'You must enter a valid city name'],
      lowercase: true,
      unique: true,
      trim: true,
    }
  }
);

// Delete space in word
locationSchema.pre('save', function (next) {
  this.city = this.city.replace(/ +/g, "")
  next()
})

// Try to match city in database after input validation
locationSchema.pre('save', function (next) {
  for (let i = 0; i < city.length; i++ ) {
    if(this.city === city[i]) {
      next()
    }
  }
  return next('City is not found') 
})

const Location = mongoose.model('location', locationSchema)

module.exports = Location