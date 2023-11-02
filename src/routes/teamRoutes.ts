import express from "express";
import { Team } from "../types/team";
import { User } from "../types/user";
const TeamModel = require('../models/team');

// fetch all teams
const getAllTeams =  async (req: any, res: any) => {
    const allTeams = await TeamModel.find({});
    res.status(200).json(allTeams);
};

// fetch team by id
const getTeamById = async (req: any, res: any) => {
    const { id } = req.params;
    const team = await TeamModel.findById(id);
    res.status(200).json(team);
};

// add team
const addTeam = async (req: any, res: any) => {
    const newTeam = req.body.newTeam;
    const user = req.body.user;

    try {
        const savedTeam = await newTeam.save();
        console.log(`Added team: ${savedTeam.name}`);
        res.status(201).json(savedTeam);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' }); 
    }
};

// update team by id 
const updateTeamById = async (req: any, res: any) => {    
    const { id } = req.params;
    const team = await TeamModel.findByIdAndUpdate(id, req.body, { runValidators: true, new: true})
    console.log(`Data updated for: ${team.name}`);
};

// delete team by id
const deleteTeamById =  async (req: any, res: any) => {    
    const { id } = req.params;
    const team = await TeamModel.findByIdAndDelete(id, req.body, { runValidators: true, new: true})
    console.log(`Deleted team: ${team.name}`);
};

export {
    getAllTeams,
    getTeamById,
    addTeam,
    updateTeamById,
    deleteTeamById
};