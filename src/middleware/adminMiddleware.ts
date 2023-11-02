import { Request, Response, NextFunction } from "express";
import { User } from "../types/user";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user: User = req.body.user as User;

    if ( user && user.isAdmin){
        next();
    } else {
        res.status(403).json({error: 'Access denied for non admin.'});
    }
}