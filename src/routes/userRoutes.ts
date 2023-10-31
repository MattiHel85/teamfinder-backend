require('dotenv').config();

import express from 'express';
import { isAdminOrCurrentUser } from '../middleware/isAdminOrCurrentUser';

const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');
const router = express.Router();

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
    const { firstName, lastName, email, password, profilePicUrl, adminCode } = req.body;

    let isAdmin: Boolean = false;
    
    adminCode === process.env.ADMIN_CODE ? isAdmin = true : isAdmin = false;

    bcrypt.genSalt(10, (err: Error, salt: string) => {
        if(err){
            return res.status(500).json({error: 'Error generating salt'});
        }

        bcrypt.hash(password, salt, async (err: Error, hash: string) => {
            if(err){
                return res.status(500).json({ error: 'Error hashing password'});
            }
            try {
                const newUser = new UserModel({
                    firstName,
                    lastName,
                    email,
                    password: hash, 
                    profilePicUrl,
                    isAdmin
                });
                await newUser.save();

                return res.status(200).json({ message: `Added user: ${newUser.firstName} ${newUser.lastName}`})
            } catch (error) {
                return res.status(500).json({ error: 'Error saving user.'})
            }
        })
    })
});

// update users by id 
router.put('/users/update/:id', isAdminOrCurrentUser, async (req, res) => {    
    const { id } = req.params;
    const user = await UserModel.findByIdAndUpdate(id, req.body, { runValidators: true, new: true})
    console.log(`Data updated for: ${user.firstName} ${user.lastName}`);
})

// delete user by id
router.delete('/users/delete/:id', isAdminOrCurrentUser, async (req, res) => {    
    const { id } = req.params;
    const user = await UserModel.findByIdAndDelete(id, req.body, { runValidators: true, new: true})
    console.log(`Deleted user: ${user.firstName} ${user.lastName}`);
})


export default router;