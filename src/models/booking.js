const mongoose = require('mongoose');

// 使用schema构造器创建一个新的模式实例
const bookingSchema = new mongoose.Schema({
    tour:{
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, 'Booking must belong to a Tour!']
    },
    user:{
        type: mongoose.Schema.ObjectId,
        // type: mongoose.Schema.ObejctId,
        // ref 选项告诉 Mongoose 在填充的时候使用哪个 model
        ref: 'User',
        required: [true, 'Booking must belong to a User!']
    },
    price: {
        type: Number,
        required: [true, 'Booking must have a price.'],
        validate: {
            validator: function(value) {
              return value > 0;
            },
            message: 'price need more than 0'
          },
      }, 
    paid:{
        type:Boolean,
        default: true
    }, 
});
bookingSchema.set('timestamps', true);


const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;