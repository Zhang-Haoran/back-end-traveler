const supertest = require('supertest');
// const app = require('../../loaders/express');
const app = require('../../../app');
const Booking = require('../../models/booking');
const { connectToDB, disconnectDB } = require('../../loaders/mongoose');
const { getBooking } = require('../../controllers/api/v1/bookings');

// jest.useFakeTimers()

//  这里的app是express里创建的app
const request = supertest(app);

// post
it('should return 201 if request is valid',  async () => {
    // serve 要和数据库先连接上
    connectToDB();
    // console.log("xxxxxxxxx");
    const res = await request 
        .post("/api/v1/bookings") 
        .send({user: "yang", tour: "sydney", price: 250}); // code: 77
        expect(res.body.booking).toHaveProperty("_id");
        expect(res.body.booking.user).toBe("yang");
        expect(res.body.booking.tour).toBe("sydney");
        expect(res.body.booking.price).toBe(250);
        expect(res.statusCode).toBe(201);
})  
// get all
it('should return 200 if request is valid', async ()=>{
    connectToDB();
    const res = await request
    .get("/api/v1/bookings")
    expect(res.body.data.data[5]).toHaveProperty("price");
    expect(res.body.data.data[4]).toHaveProperty("user");
    expect(res.body.data.data[3]).toHaveProperty("tour");
    expect(res.body.data.data[2]).toHaveProperty("_id");
    expect(res.body.data.data[1]).toHaveProperty("paid");
    expect(res.body.data.data[0]).toHaveProperty("createDate");
    expect(res.statusCode).toBe(200);
})
// get by id 
it('should return 200 if request is valid', async ()=>{
    connectToDB();
    const res = await request
    .get("/api/v1/bookings/60d57b53c41beef9556623eb")
    expect(res.statusCode).toBe(200);
})
// put
it('should return 200 if request is valid', async ()=>{
    connectToDB();
    const res = await request
    .put("/api/v1/bookings/60d57b53c41beef9556623eb")
    .send({price: 300})
    expect(res.body.data.data.price).toBe(300);
    expect(res.statusCode).toBe(200);
})

// delete 
it('should return 200 if request is valid', async ()=>{
    connectToDB();
    const res = await request
    .delete("/api/v1/bookings/60d57fe5f28c6402f3ab177d")
    expect(res.statusCode).toBe(204);
})


 describe('/bookings',()=>{
  beforeAll(()=>{
       connectToDB();
         });
  afterAll(async ()=>{
        await disconnectDB();
     });


 describe('POST', () => {
    const validBooking = {
      user: "yang2",
      tour: "sydney", 
      price: 200
    };

    const createBooking = async (body) => {
      return request.post('/api/v1/bookings').send(body);
    };

    it('should return 201 if request is valid', async () => {
      const res = await createBooking(validBooking);
      expect(res.statusCode).toBe(201);
    });
    it('should save booking to database if request is valid', async () => {
        await createBooking(validBooking);
        // find one booking 
        const booking = await Booking.findOne({user: validBooking.user }); 
        expect(booking.price).toBe(validBooking.price);
        expect(booking.user).toBe(validBooking.user);
        expect(booking.tour).toBe(validBooking.tour);
      });
});
})




// npm test
// npm run test:watch
