import { Request, Response } from 'express'
import { reservationService } from '../services/reservation.service';
import { venueService } from '../services/venue.service';
import { UuidUtil } from '../utils/uuid.util';

class ReservationController {
     // CRUD
     async create(req: Request, res: Response): Promise<Response> {
        try{
            req.body.userId = req.auth.user.id;
            
            if(await reservationService.reservationIsValid(req.body)) {
                req.body.uuid = UuidUtil.uuid4();
                req.body.venueId = (await venueService.get(req.body.venueId))?.id;
                const reservation = await reservationService.create(req.body);

                return res.status(200).json(reservation);
            }

            return res.status(500).json('Reservation invalid');
        } catch(err) {
            console.error(err);
            return res.sendStatus(500);
        }
    }

    async get(req: Request, res: Response): Promise<Response> {
        try{

            return res.status(200).json();
        } catch(err) {
            console.error(err);
            return res.sendStatus(500);
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try{

            return res.status(200).json();
        } catch(err) {
            console.error(err);
            return res.sendStatus(500);
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try{

            return res.status(200).json();
        } catch(err) {
            console.error(err);
            return res.sendStatus(500);
        }
    }
}

export const reservationController = new ReservationController();