const {Schema, model } = require('mongoose');
const Joi = require('joi');

const userSchema = new Schema({
    _id: {
      type: String,
      alias: 'email',
      lowercase: true,
      validate: {
        validator:(email) => { 
          return !Joi.string().email().validate(email).error; 
        },
        message: 'Invalid email format',
      }  
    },
    firstName: {
      type: String,
      required: [true, 'Please tell us your first name'],
      trim: true,
      minlength: 2,
      maxlength: 20
    },
    lastName: {
      type: String,
      required: [true, 'Please tell us your last name'],
      trim: true,
      minlength: 2,
      maxlength: 20
    },
    dateOfBirth:{
      type: String,
      required: [true, 'please tell us your date of birth'],
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
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      minlength: 6,
      validate: {
        validator: function (el) {
          return el === this.password; 
        },
        message: 'Two passwords are not the same',
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean, // use to "delete" user accounts
      default: true,
      select: false, // hidden from client
    },
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],  
    reviews:[{ type: Schema.Types.ObjectId, ref: 'Review' }], 
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

module.exports = model('User', userSchema);
