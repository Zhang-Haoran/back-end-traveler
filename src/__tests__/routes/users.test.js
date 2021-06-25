const supertest = require('supertest');
const app = require('../../../app');
const User = require('../../controllers/api/v1/usersControllers');
const { connectToDB, disconnectDB } = require('../../loaders/mongoose');

// app是express里创建的
const request = supertest(app);

it("should return 201 if request is valid", async () => {
    // server要和数据库连接
    connectToDB();
    const res = await request
      .post("/api/v1/bookings")
      .send({ email:"traveller@", firstName:"Nan", lastName:"Guo", dateOfBirth:"29/09/1979", password:"test1234", role:"user" }); 
    expect(res.statusCode).toBe(201);
  });
  
  // npm test
  // npm run test:watch
  
  
  
  // npm test
  // npm run test:watch