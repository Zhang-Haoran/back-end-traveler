const Booking = require('../../../models/booking');
const User = require('../../../models/user');
// const Tour = require('../../../models/tour');


async function store(req,res){
  const { paid, price} = req.body;  
  const booking = new Booking({ paid, price})  
  try {
    await booking.save();
    res.status(201).send({ booking });
  } catch (e) {
    res.status(400).send(e);
  }
}

async function show(req,res){
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

async function index(req,res){
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


async function update(req,res){
    const{ id } = req.params;
    const { paid, price } = req.body;
    const booking = await Booking.findByIdAndUpdate(
        id, 
        { paid, price},
        { new: true }
    ).exec();
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

async function destroy(req,res){
   const  { id } = req.params;
   const booking = await Booking.findByIdAndDelete(id).exec();
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

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
  };

