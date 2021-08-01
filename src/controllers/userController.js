const User = require("../models/user");
// Create User
exports.createUser = async (req,res) => {
    const {email, firstName, lastName, dateOfBirth, password} = req.body;
    const existUser = await User.findById(email).exec();
    if(existUser) return res.status(409).send("This email already exist");
    if(password.length < 6) return res.status(400).send("Password is at least 6 characters long");
    const user = new User({
        _id: email,
        firstName,
        lastName,
        dateOfBirth,
        password
    })
    await user.save();
    res.status(201).send({email});
}