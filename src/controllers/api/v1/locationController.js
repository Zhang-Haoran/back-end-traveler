const Location = require('../../../models/location');

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

exports.getLocation = async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id)
    if (!location) {
      res.status(404).json({
        message: 'location is not found'
      })
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

exports.updateLocation = async (req, res, next) => {
  try {
    const location = await Location.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    res.status(201).json({
      status: 'success',
      data: {
        location
      }
    })
    if (!location) {
      res.status(404).json({
        message: 'location is not found'
      })
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error occured'
    })
  }
}

exports.deleteLocation = async (req,res, next) => {
  const location = await Location.findByIdAndDelete(req.params.id)

  if (!location) {
    res.status(500).json({
      message: 'location is not exist'
    })
  }

  res.status(204).json({
    status: 'success',
    message: 'location has been deleted',
    data: null
  })
}