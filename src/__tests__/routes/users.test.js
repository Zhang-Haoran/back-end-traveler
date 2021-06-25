const supertest = require('supertest');
const app = require('../../../app');
const User = require('../../models/user');
const { connectToDB, disconnectDB } = require('../../loaders/mongoose');

// app是express里创建的
const request = supertest(app);
    beforeAll(() => {
        connectToDB();
    });
    // afterEach(async () => {
    //     await User.deleteMany({});
    // });
    // beforeEach(async () => {
    //     await User.deleteMany({});
    // });
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


// describe('/users',  () => {
//     beforeAll(() => {
//         connectToDB();
//     });

//     afterAll(async () => {
//         await disconnectDB();
//     });

//     beforeEach(async () => {
//         await User.deleteMany({});
//     });

//     afterEach(async () => {
//         await User.deleteMany({});
//     });

//     describe('POST', () => {
//         const validUser = {
//             email: 'excel1@gmail.com', 
//             firstName: 'Tom', 
//             lastName: 'Dow', 
//             dateOfBirth: '29/09/1959', 
//             password: 'test1234', 
//             role: 'user'
//         };
//         const createUser = async (body) => {
//           return request
//             .post('/api/v1/users')
//             .send(body)
//         };
//         it('should return 201 if request is valid', async () => {
//           const res = await createUser(validUser);
//           expect(res.statusCode).toBe(201);
//         });
//         it('should save user to database if request is valid', async () => {
//           await createUser(validUser);
//           const user = await User.findOne({ email: validUser.email });
//           expect(user.email).toBe(validUser.email);
//           expect(user.firstName).toBe(validUser.firstName);
//           expect(user.lastName).toBe(validUser.lastName);
//           expect(user.dateOfBirth).toBe(validUser.dateOfBirth);
//           expect(user.password).toBe(validUser.password);
//           expect(user.role).toBe(validUser.role);
//         });
//     });

//     describe('PUT /bookings/test3@gmail.com', () => {
//         it('responds with an updated user', async () => {
//         const newUser = await request
//             .post("/api/v1/users")
//             .send({
//             firstName:'Brenda'
//             });
//         const updatedUser= await request
//             .put(`/users/${newUser.body.email}`)
//         expect(updatedUser.body.firstName).toBe("Brenda");
//         expect(updatedUser.statusCode).toBe(200);
    
//         //   const res = await request.get('/api/v1/bookings/60d5739f69668bedaf04afde');
//         });
//     });

//     describe('GET',()=>{
//         it('should respond with an array of users', async ()=>{
//             const res = await request.get('/api/v1/users');
//             expect(res.body).toEqual({"data": {"data": []}, "status": "success"})
//             expect(res.statusCode).toBe(200);
//         });
//     })
// });