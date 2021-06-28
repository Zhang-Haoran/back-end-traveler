const mongoose = require('mongoose');
// 使用schema构造器创建一个新的模式实例
const bookingSchema = new mongoose.Schema({

    tour:{
        // ObjectId：特定对象的唯一id
        type: String,
        // type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, 'Booking must belong to a Tour!']
    },
    user:{
         // type: mongoose.Schema.ObejctId,
        type: String,
        // ref 选项告诉 Mongoose 在填充的时候使用哪个 model
        ref: 'User',
        required: [true, 'Booking must belong to a User!']
    },
    price: {
        type: Number,
        required: [true, 'Booking must have a price.']
      },
    createDate: {
        type: Date,
        default: Date.now()
      },
    paid:{
        type:Boolean,
        default: true
    }
});

// bookingSchema.pre(/^find/, function(next){
    // populate user, tour
//  this.populate('User').populate({
//    path: 'tour',
//    select: 'city',
// });
// next();
// })
// 使用模式编译模型
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;