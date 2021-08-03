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
  // Create a user
  describe('POST', () => {
    // Successfully created
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
    // Email already existed
    it('should return 409 if email is existed', async () => {
      const res = await request.post('/api/v1/users').send({
        email: 'test@gmail.com',
        firstName: 'newUser',
        lastName: 'newUser',
        dateOfBirth: '02/08/2021',
        password: '123456',
      });
      expect(res.statusCode).toBe(409);
    });

    // Password length less than 6
    it('should return 400 if password is less than 6 digital', async () => {
      const res = await request.post('/api/v1/users').send({
        email: 'passwordTest@gmail.com',
        firstName: 'newUser',
        lastName: 'newUser',
        dateOfBirth: '02/08/2021',
        password: '12345',
      });
      expect(res.statusCode).toBe(400);
    });

    // Invalid request body
    it('should return 400 if request body is invalid', async () => {
      const res = await request.post('/api/v1/users').send({
        firstName: 'newUser',
        lastName: 'newUser',
        dateOfBirth: '02/08/2021',
        password: '12345',
      });
      expect(res.statusCode).toBe(400);
    });

    //Invalid date of birth
    it('should return 400 if date of birth is later than today', async () => {
      const res = await request.post('/api/v1/users').send({
        email: 'DOB@gmail.com',
        firstName: 'newUser',
        lastName: 'newUser',
        dateOfBirth: '02/08/2099',
        password: '12345',
      });
      expect(res.statusCode).toBe(400);
    });

    //Invalid email format
    it('should return 400 if email format is invalid', async () => {
      const res = await request.post('/api/v1/users').send({
        email: 'gmail.com',
        firstName: 'newUser',
        lastName: 'newUser',
        dateOfBirth: '02/08/2099',
        password: '12345',
      });
      expect(res.statusCode).toBe(400);
    });
  });

  //Get Users
  describe('GET', () => {
    // Get all users
    it('should return 200 if get all users successfully', async () => {
      const res = await request.get('/api/v1/users');
      expect(res.statusCode).toBe(200);
    });

    // Get user by email
    it('should return 200 if get user by email successfully', async () => {
      const res = await request.get('/api/v1/users/test@gmail.com');
      expect(res.statusCode).toBe(200);
    });

    // No record for email
    it('should return 404 if user email not existed', async () => {
      const res = await request.get('/api/v1/users/notExisted@gmail.com');
      expect(res.statusCode).toBe(404);
    });
  });

  // Update user
  describe('PATCH', () => {
    // Update user by email
    it('should return 200 if update user by email successfully', async () => {
      const res = await request.patch('/api/v1/users/test@gmail.com').send({
        email: 'test@gmail.com',
        firstName: 'newUser',
        lastName: 'newUser',
        dateOfBirth: '02/08/2099',
      });
      expect(res.statusCode).toBe(200);
    });

    // No record for email
    it('should return 404 if user email not existed', async () => {
      const res = await request.patch('/api/v1/users/notExisted@gmail.com').send({
        email: 'notExisted@gmail.com',
        firstName: 'newUser',
        lastName: 'newUser',
        dateOfBirth: '02/08/2099',
        password: '654321',
      });
      expect(res.statusCode).toBe(404);
    });
  });

  // Delete user
  describe('DELETE', () => {
    // Delete user by email
    it('should return 204 if delete user by email successfully', async () => {
      const res = await request.delete('/api/v1/users/test@gmail.com');
      expect(res.statusCode).toBe(204);
    });

    // No record for email
    it('should return 404 if user email not existed', async () => {
      const res = await request.delete('/api/v1/users/notExisted@gmail.com');
      expect(res.statusCode).toBe(404);
    });
  });
});
