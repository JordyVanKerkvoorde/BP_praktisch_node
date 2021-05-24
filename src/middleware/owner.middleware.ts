import { NextFunction, Request, Response } from "express";
import { venueService } from "../services/venue.service";

class OwnerMiddleware {
    async authenticate(req: Request, res: Response, next: NextFunction) {
        const user = req.auth.user;
        const venue = await venueService.get(req.params.uuid);
        if(venue?.ownerId === user.id) next();
        else return res.sendStatus(403);
    }
}

export const ownerMiddleware = new OwnerMiddleware();