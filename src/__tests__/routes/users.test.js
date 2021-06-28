const supertest = require('supertest');
const app = require('../../../app');
const User = require('../../models/user');
const { connectToDB, disconnectDB } = require('../../loaders/mongoose');

const request = supertest(app);
    beforeAll(() => {
        connectToDB();
    });
    afterEach(async () => {
        await User.deleteMany({});
    });
    beforeEach(async () => {
        await User.deleteMany({});
    });
    afterAll(async () => {
        await disconnectDB();
    });

    // create a user
    it("should return 201 if request is valid", async () => {
        const res = await request
        .post('/api/v1/users')
        .send({ email:"test6@gmail.com", firstName:"Nan", 
        lastName: "Guo" , dateOfBirth: "29/09/1979", password: "test1234", role: "user" }); 
        expect(res.statusCode).toBe(201);
    });

    // get all users
    it('should return 200 if request is valid', async ()=>{

        const res = await request
        .get("/api/v1/users")
        expect(res.statusCode).toBe(200);
    })
    // get user by id(email)
    it('should return 200 if get user by id', async ()=>{
        const res = await request
        .get("/api/v1/users/test5@gmail.com")
        expect(res.statusCode).toBe(200);
    })
    // update user by id(email)
    it('should return 200 if update user by id', async ()=>{
        const res = await request
        .put("/api/v1/users/test5@gmail.com")
        .send({firstName:'Brenda'})
        expect(res.body.firstName).toBe('Brenda');
        expect(res.statusCode).toBe(200);
    })
    // delete user by id
    it('should return 200 delete user by id', async ()=>{
        const res = await request
        .delete("/api/v1/users/test4@gmail.com")
        expect(res.statusCode).toBe(204);
    })
