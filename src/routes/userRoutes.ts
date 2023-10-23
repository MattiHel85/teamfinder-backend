import express from 'express';
import { User } from '../types/user';
const UserModel = require('../models/user');

const router = express.Router();

const testUser = new UserModel({
    firstName: "Matt",
    lastName: "Simpson",
    email: "matt.rc.simpson@gmail.com",
    password: "12345",
    profilePicUrl: "www.pics.com/me.jpg",
    isAdmin: true
})

// get users 
router.get('/users', async (req, res) => {
    const allUsers = await UserModel.find({});
    res.status(200).json(allUsers);
});
// fetch user by id
router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    res.status(200).json(user);
});

// add user
router.post('/users/adduser', async (req, res) => {
    const newUser = testUser;

    await newUser.save()
        .then((newUser: User) => {
            console.log(`Added user: ${newUser.firstName} ${newUser.lastName}`)
        })
        .catch((e: Error) => {
            console.log(e)
        })
});

// update users by id 
router.put('/users/update/:id', async (req, res) => {    
    const { id } = req.params;
    const user = await UserModel.findByIdAndUpdate(id, req.body, { runValidators: true, new: true})
    console.log(`Data updated for: ${user.firstName} ${user.lastName}`);
})

// delete team by id
router.delete('/users/delete/:id', async (req, res) => {    
    const { id } = req.params;
    const user = await UserModel.findByIdAndDelete(id, req.body, { runValidators: true, new: true})
    console.log(`Deleted user: ${user.firstName} ${user.lastName}`);
})


export default router;