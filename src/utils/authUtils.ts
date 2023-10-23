require('dotenv').config()
import jwt from 'jsonwebtoken';
import { User } from '../types/user';

export const generateToken = (user: User) => {
    const payload = {
        id: user.id,
        email: user.email
    };

    const secretKey = process.env.JWT_SECRET_KEY || 'secretKeyByDefault';

    const options = {
        expiresIn: '2h'
    };

    const token = jwt.sign(payload, secretKey, options);
    console.log('Generated Token:', token);
    return token;
}