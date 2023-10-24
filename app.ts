require('dotenv').config();

import './src/config/passport';
import express from 'express';
import { Error } from 'mongoose';
import loginRouter from './src/routes/authRoutes';
import teamRouter from './src/routes/teamRoutes';
import userRouter from './src/routes/userRoutes';
import passport from 'passport';

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT;
const mongoose = require('mongoose');
const mongoPass = process.env.PASSWORD;

// Parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to Teamfinder 2.0')
});

// db connection address 
const uri = `mongodb+srv://mattrcsimpson:${mongoPass}@cluster0.oe7tsb8.mongodb.net/?retryWrites=true&w=majority`;

// connect to db
mongoose.connect(uri, {
    useNewUrlParser: true
});

const db = mongoose.connection;

// Connection status
db.on("error", (err: Error) => console.log(`Connection ${err}`));
db.once("open", () => console.log("Connected to DB!"));


/* TEAM ROUTES */

// fetch teams
app.get('/teams', teamRouter);
// fetch team by id
app.get('/teams/:id', teamRouter);
// add team
app.post('/teams/addteam', teamRouter);
// update team by id 
app.put('/teams/update/:id', teamRouter);
// delete team by id
app.delete('/teams/delete/:id', teamRouter);



/* AUTH ROUTES */

// login
app.post('/login', loginRouter);
// get authorised profile
app.get('/profile', loginRouter);


/* USER ROUTES */

// get users 
app.get('/users', userRouter);
// get user by id
app.get('/users/:id', userRouter)
// add user
app.post('/users/adduser', userRouter);
// update user
app.put('/users/update/:id', userRouter);
// delete user
app.delete('/users/delete/:id', userRouter);


// server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });