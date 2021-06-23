const mongoose = require("mongoose");
const {Schema, model } = require('mongoose');
const Joi = require('joi');


const userSchema = new mongoose.Schema({
    _id: {
      type: String,
      alias: 'email',
      lowercase: true,
      validate: {
        validator:(email) => { 
          return !Joi.string().email().validate(email).error; 
        },
        msg: 'Invalid email format'
      }  
    },
    firstName: {
      type: String,
      required: [true, 'Please tell us your name'],
      trim: true,
      minlength: 2,
      maxlength: 20
    },
    lastName: {
      type: String,
      required: [true, 'Please tell us your name'],
      trim: true,
      minlength: 2,
      maxlength: 20
    },
    // email: {
    //   type: String,
    //   required: [true, 'Please provide your email'],
    //   unique: true,
    //   lowercase: true,
    //   index: true,
    //   validate: {
    //     validator:(email) => { 
    //       return !Joi.string().email().validate(email).error; 
    //     },
    //     msg: 'Invalid email format'
    //   }  
    // },
    dateOfBirth:{
      type: Date,
      // required: [true, 'please tell us your date of birth'],
      // validate:{

      // }
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false, // don't send out passwords in responses
      // validate: {
      // }
    },
    // passwordConfirm is only required for input, not exist in DB
    passwordConfirm: {
      type: String,
      // required: [true, 'Please confirm your password'],
      // validate: {
      // },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean, // use to "delete" user accounts
      default: true,
      select: false, // hidden from client
    },
    __v:{
      type: Number,
      select: false
    }
  },
  {
    timestamps: true,
    toJSON:{
        virtuals : true
    },
    id: false
});
  

const User = mongoose.model("User", userSchema);
module.exports = User;
