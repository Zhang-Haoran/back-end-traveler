const express = require('express');
const Location = require('../../../models/location');

// const locationController = express()

// locationController.post('/createLocation', async (req, res) => {
//   const { city } = req.body;
//   const location = new Location({ city });
//   const ret = await location.save();
//   res.status(201).json(ret);
// });

// Location.get('/getLocation/:id', async (req, res) => {
//   const id = req.params.id;
//   const location = await Location.findById(id);
//   if (!location) {
//     res.status(404).json({
//       message: 'location is not found'
//     })
//   } else {
//     res.status(201).json({
//       status: 'success',
//       data: {
//         location
//       }
//     })
//   }
// })

// Location.patch('/updateLocation/:id', async (req, res) => {
//   const id = req.params.id;
//   const {city} = req.body;
//   const location = await Location.findByIdAndUpdate(id, {city}, {
//     new: true,
//     runValidators: true,
//   });
//   if (!location) {
//     res.status(404).json({
//       message: 'location is not found'
//     })
//   } else {
//     const ret = await location.save();
//     res.status(201).json(ret);
//   }
// });

// Location.delete('/deleteLocation/:id', async (req, res) => {
//   const id = req.params.id;
//   const location = await Location.findByIdAndDelete(id);
//   if (!location) {
//     res.status(404).json({
//       message: 'location is not found'
//     })
//   } else {
//     res.status(204).json({
//       data: null,
//     });
//   }
// });

exports.getAllLocations = async (req, res, next) => {
  try {
    const locations = await Location.find()
    res.status(200).json({
      status: 'success',
      data: {
        number: locations.length,
        locations
      }
    })
  } catch (err) {
    res.status(500).json({
      message: 'Error occured'
    })
  }
}

exports.getLocation = async function (req, res, next) {
  try {
    const location = await Location.findById(req.params.id)
    if (!location) {
      res.status(404).json({
        message: 'location is not found'
      })
      return next()
    }
    res.status(201).json({
      status: 'success',
      data: {
        location
      }
    })
  } catch (err) {
    res.status(500).json({
      message: 'Error occured'
    })
  }
  return next()
}

exports.createLocation = async (req, res, next) => {
  try {
    const newLocation = await Location.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        location: newLocation
      }
    })
  } catch (err) {
    res.status(500).json({
      message: 'Error occured'
    })
  }
}

exports.updateLocation = async function (req, res, next) {
  try {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!location) {
      res.status(404).json({
        message: 'location is not found'
      })
      return next()
    } 
    res.status(201).json({
      status: 'success',
      data: {
        location
      }
    })
  } catch (err) {
    res.status(500).json({
      message: 'Error occured'
    })
  }
  return next()
}

exports.deleteLocation = async function (req,res, next) {
  const location = await Location.findByIdAndDelete(req.params.id)

  if (!location) {
    res.status(404).json({
      message: 'location is not exist'
    })
    return next()
  }

  res.status(204).json({
    status: 'success',
    message: 'location has been deleted',
    data: null
  })
  return next()
}
