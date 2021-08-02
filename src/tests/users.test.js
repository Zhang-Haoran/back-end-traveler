const supertest = require('supertest');
const User = require('../models/userModel');
const app = require('../app');
const mongoose = require('mongoose');

const request = supertest(app);
describe('/api/v1/users', () => {
  beforeAll(async () => {
    await User.deleteMany({});
    const user = new User({
      email: 'test@gmail.com',
      firstName: 'Haoran',
      lastName: 'Zhang',
      dateOfBirth: '02/08/2021',
      password: '123456',
    });
    await user.save();
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.disconnect();
  });
  describe('POST', () => {
    it('should return 201 if request is valid', async () => {
      const res = await request.post('/api/v1/users').send({
        email: 'new@gmail.com',
        firstName: 'newUser',
        lastName: 'newUser',
        dateOfBirth: '02/08/2021',
        password: '123456',
      });
      expect(res.statusCode).toBe(201);
    });
  });
});
