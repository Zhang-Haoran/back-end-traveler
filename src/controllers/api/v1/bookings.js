const Booking = require('../../../models/booking');
const User = require('../../../models/user');
// const Tour = require('../../../models/tour');
const Joi = require('joi');


async function createBooking(req,res){
  const {tour, user, paid, price} = req.body;
 
  const booking = new Booking({tour, user, paid, price})  // _id:code,
  try {
    await booking.save();
    res.status(201).send({ booking });
  } catch (e) {
    res.status(400).send(e);
  }
}

async function getBooking(req,res){
 const { id } = req.params;
 const booking = await Booking.findById(id).exec();
 if(!booking){
     return res.sendStatus(404).json('No document found with that ID');
 }
try{
    res.status(200).json({
        status: 'success',
        data:{
            data: booking
        }
    });
} catch (e) {
    res.status(400).send(e);
  }

}

async function getAllBookings(req,res){
   const bookings = await Booking.find().exec();
   try {
    res.status(200).json({
        status: 'success',
        data:{
            data: bookings
        }
    });
  } catch (e) {
    res.status(400).send(e);
  }
}


async function updateBooking(req,res){
    const{ id } = req.params;
    const { tour, user, paid, price } = req.body;
    const booking = await Booking.findByIdAndUpdate(
        id, 
        { tour, user, paid, price},
        { new: true }
    );
    if (!booking){
        return res.sendStatus(404).json('No document found with that ID');
    }
    try {
        res.status(200).json({
            status: 'success',
            data:{
                data: booking
            }
        });
      } catch (e) {
        res.status(400).send(e);
      }
}

async function deleteBooking(req,res){
   const  { id } = req.params;
   const booking = await Booking.findByIdAndDelete(id);
   if(!booking){
       return res.sendStatus(404).json('No document found with that ID');
   }
   try {
    res.status(204).json({
        status: 'success',
        data:{
            data: null
        }
    });
  } catch (e) {
    res.status(400).send(e);
  }
}
// 看看这个user下面的booking tours
// export async function getMyTours(req,res,next){
//   // find all bookings
//   const bookings = await Booking.find({user: req.user.id});
//   // find tours with return ids
//   const tourIDs = bookings.map(el=>el.tour);
//   const tours = await Tour.find({_id: { $in: tourIDs }});
//   res.status(200).render('overview',{
//     title: 'My Tours',
//     tours
//   });
// }

module.exports = {
    createBooking,
    getBooking,
    getAllBookings,
    updateBooking,
    deleteBooking
  };

