import { Router } from 'express';
import { userController } from './controllers/user.controller';
import { venueController } from './controllers/venue.controller';
import { authMiddleware } from './middleware/auth.middleware';
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

        // registration
        
        return router;
    }
}

export const restRouter = new RestRouter();