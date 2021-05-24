import Reservation from "../models/reservation.model";
import { venueService } from "./venue.service";

class ReservationService {
    getAll(): Promise<Reservation[]> {
        return Reservation.findAll();
    }

    async getAllReservationsForVenue(venueId: string): Promise<Reservation[] | null> {
        return (await this.getAll()).filter(x => x.venueId === venueId);
        // return Reservation.findAll({ where: { venueId }});
    }

    async getAllReservationsForUser(userId: number): Promise<Reservation[] | null> {
        return (await this.getAll()).filter(x => x.userId === userId);
        // return Reservation.findAll({ where: { userId }})
    }

    async getCurrentReservationsForTime(venueId: string, reservationStart: Date, reservationEnd: Date): Promise<Reservation[]> {
        const reservations = await this.getAll();
        const reservationsForVenue = reservations.filter(x => x.venueId === venueId);
        const reservationsForDates = reservationsForVenue.filter(x => (new Date(x.reservationEnd) <= new Date(reservationEnd) && new Date(x.reservationEnd) > new Date(reservationStart)) 
                                                                    || (new Date(x.reservationStart) >=  new Date(reservationStart) && new Date(x.reservationStart) < new Date(reservationEnd)));
        
        return reservationsForDates;
    }

    async reservationIsValid(body: any): Promise<boolean> {
        const overlappingReservations = await this.getCurrentReservationsForTime((await venueService.get(body.venueId))?.id, body.reservationStart, body.reservationEnd);
        const venue = await venueService.get(body.venueId);
        const bookedSpots = overlappingReservations.reduce((acc, val) => {
            return acc += val.spots
        }, 0);

        return venue ? (bookedSpots + body.spots) <= venue.availableSpots : false;
    }

    // CRUD
    async create(body: any): Promise<Reservation | null> {
        await Reservation.create(body);

        return this.get(body.uuid);
    } 

    async get(uuid: string): Promise<Reservation | null> {
        return (await this.getAll()).filter(x => x.uuid === uuid)[0];
        // return Reservation.findOne({ where: { uuid }});
    }
}

export const reservationService = new ReservationService();