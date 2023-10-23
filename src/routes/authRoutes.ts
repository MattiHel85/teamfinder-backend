import express from 'express';
import passport from '../config/passport';
import { generateToken } from '../utils/authUtils';
import { User } from '../types/user';

const UserModel = require('../models/user');

const router = express.Router();

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({message: 'Authentication successful!'})
})

router.post('/login', async (req, res) => {
    const { email, password} = req.body;
    const user: User = await UserModel.findOne({email, password});

    if (!user){
        return res.status(401).json({error: 'Invalid user'});
    }

    const token = generateToken(user);
    res.json({token})
})

export default router;