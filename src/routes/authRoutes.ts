import express from 'express';
import passport from '../config/passport';
import { generateToken } from '../utils/authUtils';
import { User } from '../types/user';

const bcrypt = require('bcryptjs');
const UserModel = require('../models/user');
const router = express.Router();

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    const user = req.user;
    res.json(user)
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user: User = await UserModel.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid user' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = generateToken(user);
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;