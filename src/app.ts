require('dotenv').config() // Require this to hide MongoDB password
import express from 'express';
import { Error } from 'mongoose';


// types
import { Team } from './types/team';
import { User } from './types/user';


const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = process.env.PORT;

const mongoose = require('mongoose');
const mongoPass = process.env.PASSWORD;

// models
const TeamModel = require('./models/team');
const UserModel = require('./models/user');


// Parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

// Test team addition
const testTeam = new TeamModel({
    badgeUrl: "www.test.com",
    name: "Test Team United",
    nickname: "Testy Testes",
    founded: 1888,
    groundName: "Test Ground",
    groundCapacity: 50000,
    country: "England",
    league: "PL",
    coach: "Test Coach"
});

// Test user
const testUser = new UserModel({
    firstName: "Matt",
    lastName: "Simpson",
    emailAddress: "matt.rc.simpson@gmail.com",
    password: "12345",
    profilePicUrl: "www.pics.com/me.jpg",
    isAdmin: true
})

/* TEAM ROUTES */

// fetch all teams
app.get('/teams', async (req, res) => {
    const allTeams = await TeamModel.find({});
    res.status(200).json(allTeams);
});

// fetch team by id
app.get('/teams/:id', async (req, res) => {
    const { id } = req.params;
    const team = await TeamModel.findById(id);
    res.status(200).json(team);
});


// add team
app.post('/teams/addteam', async (req, res) => {
    const newTeam = testTeam;

    await newTeam.save()
        .then((newTeam: Team) => {
            console.log(`Added team: ${newTeam.name}`)
        })
        .catch((e: Error) => {
            console.log(e)
        })
});

// update team by id 
app.put('/teams/update/:id', async (req, res) => {    
    const { id } = req.params;
    const team = await TeamModel.findByIdAndUpdate(id, req.body, { runValidators: true, new: true})
    console.log(`Data updated for: ${team.name}`);
})

// delete team by id
app.delete('/teams/delete/:id', async (req, res) => {    
    const { id } = req.params;
    const team = await TeamModel.findByIdAndDelete(id, req.body, { runValidators: true, new: true})
    console.log(`Deleted team: ${team.name}`);
})

/* USER ROUTES */

// add user
app.post('/users/adduser', async (req, res) => {
    const newUser = testUser;

    await newUser.save()
        .then((newUser: User) => {
            console.log(`Added user: ${newUser.firstName} ${newUser.lastName}`)
        })
        .catch((e: Error) => {
            console.log(e)
        })
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });