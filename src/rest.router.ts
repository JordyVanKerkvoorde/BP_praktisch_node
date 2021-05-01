import { Router } from 'express';
import { userController } from './controllers/user.controller';

class RestRouter {
    public routes(): Router {
        const router = Router();

        // user
        router.post('/register', userController.register);
        router.post('/login', userController.login);
        
        return router;
    }
}

export const restRouter = new RestRouter();