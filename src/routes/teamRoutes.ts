import express from "express";
import { Team } from "../types/team";
import { User } from "../types/user";
import { Error } from "mongoose";
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
    const newTeam = new TeamModel({
        badgeUrl: req.body.badgeUrl,
        name: req.body.name,
        nickname: req.body.nickname,
        founded: req.body.founded,
        groundName: req.body.groundName,
        groundCapacity:  req.body.groundCapacity,
        country: req.body.country,
        league: req.body.league,
        coach: req.body.coach
    })
    await newTeam.save()
        .then((newTeam: Team) => {
            console.log(`Added team: ${newTeam.name}`)
        })
        .catch((e: Error) => {
            console.log(e)
        })
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