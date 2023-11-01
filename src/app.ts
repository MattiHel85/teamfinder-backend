require('dotenv').config();

import './config/passport';
import express from 'express';
import { Error } from 'mongoose';
import passport from 'passport';
import { isAdminOrCurrentUser } from './middleware/isAdminOrCurrentUser';
import { isAdmin } from './middleware/adminMiddleware';

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const teamRoutes = require('./routes/teamRoutes');
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
    res.send('Welcome to Futistr')
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
app.get('/teams', teamRoutes.getAllTeams);
// fetch team by id
app.get('/teams/:id', teamRoutes.getTeamById);
// add team
app.post('/teams/addteam', isAdmin, teamRoutes.addTeam);
// update team by id 
app.put('/teams/update/:id', isAdmin, teamRoutes.updateTeamById);
// delete team by id
app.delete('/teams/delete/:id', isAdmin, teamRoutes.deleteTeamById);



/* AUTH ROUTES */

// login
app.post('/login', authRoutes.login);
// get authorised profile
app.get('/profile', passport.authenticate('jwt', {session: false}), authRoutes.getProfile);


/* USER ROUTES */

// get users 
app.get('/users', userRoutes.getAllUsers);
// get user by id
app.get('/users/:id', userRoutes.getUserById)
// add user
app.post('/users/adduser', userRoutes.addUser);
// update user
app.put('/users/update/:id', isAdminOrCurrentUser, userRoutes.updateUserById);
// delete user
app.delete('/users/delete/:id', isAdminOrCurrentUser, userRoutes.deleteUserById);


// server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });