import { Request, Response } from "express";
import { venueService } from "../services/venue.service";
import { UuidUtil } from "../utils/uuid.util";

class VenueController {
    async getAll(req: Request, res: Response): Promise<Response> {
        try{
            const venues = await venueService.getAll();
            
            return res.status(200).json(venues);
        } catch(err) {
            console.error(err);
            return res.sendStatus(500);
        }
    }

    // CRUD
    async create(req: Request, res: Response): Promise<Response> {
        try{
            req.body.ownerId = req.auth.user.id;
            req.body.uuid = UuidUtil.uuid4();
            const venue = await venueService.create(req.body)

            return res.status(200).json(venue);
        } catch(err) {
            console.error(err);
            return res.sendStatus(500);
        }
    }

    async get(req: Request, res: Response): Promise<Response> {
        try{
            const venue = await venueService.get(req.params.uuid)

            return res.status(200).json(venue);
        } catch(err) {
            console.error(err);
            return res.sendStatus(500);
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try{
            const venue = await venueService.update(req.params.uuid, req.body);

            return res.status(200).json(venue);
        } catch(err) {
            console.error(err);
            return res.sendStatus(500);
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try{
            const venue = !!await venueService.delete(req.params.uuid)

            return res.status(200).json(venue);
        } catch(err) {
            console.error(err);
            return res.sendStatus(500);
        }
    }
}

export const venueController = new VenueController();