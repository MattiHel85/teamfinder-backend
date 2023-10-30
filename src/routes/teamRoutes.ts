import express from "express";
import { isAdmin } from "../middleware/adminMiddleware";
import { Team } from "../types/team";
const TeamModel = require('../models/team');

const router = express.Router();


// fetch all teams
router.get('/teams', async (req, res) => {
    const allTeams = await TeamModel.find({});
    res.status(200).json(allTeams);
});

// fetch team by id
router.get('/teams/:id', async (req, res) => {
    const { id } = req.params;
    const team = await TeamModel.findById(id);
    res.status(200).json(team);
});


// add team
router.post('/teams/addteam', isAdmin, async (req, res) => {
    const newTeam = req.body;

    await newTeam.save()
        .then((newTeam: Team) => {
            console.log(`Added team: ${newTeam.name}`)
        })
        .catch((e: Error) => {
            console.log(e)
        })
});

// update team by id 
router.put('/teams/update/:id', isAdmin, async (req, res) => {    
    const { id } = req.params;
    const team = await TeamModel.findByIdAndUpdate(id, req.body, { runValidators: true, new: true})
    console.log(`Data updated for: ${team.name}`);
})

// delete team by id
router.delete('/teams/delete/:id', isAdmin, async (req, res) => {    
    const { id } = req.params;
    const team = await TeamModel.findByIdAndDelete(id, req.body, { runValidators: true, new: true})
    console.log(`Deleted team: ${team.name}`);
})

export default router;