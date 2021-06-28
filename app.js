const cors = require('cors');
const express = require('express');
const loader = require('./src/loaders');
const Location = require('./src/models/location');

const app = express();
loader.init(app);

app.post('/createLocation', async (req, res) => {
  const { city } = req.body;
  const location = new Location({ city });
  const ret = await location.save();
  res.status(201).json(ret);
});

app.get('/getLocation/:id', async (req, res) => {
  const id = req.params.id
  const location = await Location.findById(id)
  if (!location) {
    res.status(404).json({
      message: 'location is not found'
    })
  } else {
    res.status(201).json({
      status: 'success',
      data: {
        location
      }
    })
  }
})

app.patch('/updateLocation/:id', async (req, res) => {
  const id = req.params.id;
  const {city} = req.body;
  const location = await Location.findByIdAndUpdate(id, {city}, {
    new: true,
    runValidators: true,
  });
  if (!location) {
    res.status(404).json({
      message: 'location is not found'
    })
  } else {
    const ret = await location.save();
    res.status(201).json(ret);
  }
});

app.delete('/deleteLocation/:id', async (req, res) => {
  const id = req.params.id;
  const location = await Location.findByIdAndDelete(id);
  if (!location) {
    res.status(404).json({
      message: 'location is not found'
    })
  } else {
    res.status(204).json({
      data: null,
    });
  }
});

module.exports = app;
