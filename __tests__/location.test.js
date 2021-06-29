const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const request = supertest(app);
const Location = require('../src/models/location');

// Disconnect database after test
afterAll(async () => {
  await mongoose.disconnect();
});

const locationCreateTest = (city, cityConfirm, status) => {
  it('locationCreateTest is running...', async () => {
    const res = await request.post('/api/v1/location')
    .send({
      city: `${city}`
    });
    const location = await Location.findOne({city: `${cityConfirm}`});

    // 201 Created
    expect(res.statusCode).toBe(status)
    expect(location.city).toBe(`${cityConfirm}`)

    // Delete current data to avoid duplicate keys
    await Location.findOneAndDelete({city: `${cityConfirm}`})
  });
};

const locationGetTest = (id, status) => {
  it('locationGetTest is running...', async () => {
    const res = await request.get(`/api/v1/location/${id}`)
    
    // Search location in the database
    expect(res.statusCode).toBe(status)
  });
};

const locationUpdateTest = (id, cityUpdate, status) => {
  it('locationUpdateTest is running...', async () => {
    const res = await request.patch(`/api/v1/location/${id}`)
    .send({
      city: `${cityUpdate}`
    });

    expect(res.statusCode).toBe(status)
  });
};

const locationDeleteTest = (id, status) => {
  it('locationDeleteTest is running...', async () => {
    const res = await request.delete(`/api/v1/location/${id}`)
    const location = await Location.findById(id)

    // 204 No content
    expect(res.statusCode).toBe(status)
  })
}

describe('Location CRUD Testing', () => {

  describe('Should create new location and save to database after input validation', () => {
    locationCreateTest('sydney', 'sydney' ,201)
    locationCreateTest('Sydney', 'sydney', 201)
    locationCreateTest('SYDney', 'sydney', 201)
    locationCreateTest('SYDNEY', 'sydney', 201)
    locationCreateTest(' sydney', 'sydney', 201)
    locationCreateTest('sydney ', 'sydney', 201)
    locationCreateTest(' sydney ', 'sydney', 201)
    locationCreateTest('s ydney', 'sydney', 201)
  });

  describe('Should get the correct location if input id is valid', () => {
    locationGetTest('60daf9f713dd1976af6a6b29', 201)
    locationGetTest('60dae77b20f58f6bc3793c9a', 404)
    locationGetTest('ewaewa', 500)
  });

  describe('Should update location after found by id', () => {
    locationUpdateTest('60daf4232ea1b1733aea7d80', 'tasmania', 201)
    locationUpdateTest('60daf4232ea1b1313aea7d87', 'canberra', 404)
  });

  // Delete canberra
  describe('Should delete location after found by id', () => {
    locationDeleteTest('60daf9fe13dd1976af6a6b2b', 204)
    locationDeleteTest('60d934e380ce144a7817d721', 404)
  });

});

