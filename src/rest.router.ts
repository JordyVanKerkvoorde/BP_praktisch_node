import { Router } from 'express';
import { reservationController } from './controllers/reservation.controller';
import { userController } from './controllers/user.controller';
import { venueController } from './controllers/venue.controller';
import { authMiddleware } from './middleware/auth.middleware';
import { ownerMiddleware } from './middleware/owner.middleware';
import { roleMiddleware } from './middleware/role.middleware';

class RestRouter {
    public routes(): Router {
        const router = Router();

        // user
        router.post('/register', userController.register);
        router.post('/login', userController.login);
        router.get('/me', authMiddleware.authenticate, userController.me);

        // venue
        router.get('/venues', authMiddleware.authenticate, venueController.getAll);
        router.get('/venues/:uuid', authMiddleware.authenticate, venueController.get);
        router.post('/venues', authMiddleware.authenticate, roleMiddleware.owner, venueController.create);
        router.put('/venues/:uuid', authMiddleware.authenticate, roleMiddleware.owner, venueController.update);
        router.delete('/venues/:uuid', authMiddleware.authenticate, roleMiddleware.owner, venueController.delete);

        // reservation
        router.get('/reservations', authMiddleware.authenticate, ownerMiddleware.authenticate, reservationController.get);
        router.post('/reservations', authMiddleware.authenticate, reservationController.create);
        router.put('/reservations/:uuid', authMiddleware.authenticate, reservationController.update);
        router.delete('/reservations/:uuid', authMiddleware.authenticate, reservationController.delete);

        
        return router;
    }
}

export const restRouter = new RestRouter();