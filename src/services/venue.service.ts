import Venue from "../models/venue.model";

class VenueServive {
    getAll(): Promise<Venue[]>{
        return Venue.findAll();
    }

    // CRUD
    async create(body: any): Promise<Venue | null> {
        await Venue.create(body);
        
        return this.get(body.uuid);
    }

    get(uuid: string): Promise<Venue | null> {
        return Venue.findOne({ where: { uuid } });
    }

    async update(uuid: string, venueData: any): Promise<Venue | null> {
        await Venue.update(venueData, { where: { uuid } });
        return this.get(uuid)
    }

    delete(uuid: string): Promise<any> {
        return Venue.destroy({ where: { uuid } })
    }
}

export const venueService = new VenueServive();