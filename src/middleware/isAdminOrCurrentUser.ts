import { Request, Response, NextFunction} from "express";
import { User } from "../types/user";

export const isAdminOrCurrentUser = (req: Request, res: Response, next: NextFunction) => {
    const currentUser: User = req.user as User;
    const requestedUserId = req.params.id;

    if (currentUser.isAdmin || currentUser.id === requestedUserId){
        next();
    } else {
        res.status(403).json({error: 'Access denied.'})
    }
}