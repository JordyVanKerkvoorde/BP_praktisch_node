import { Router } from 'express';
import { userController } from './controllers/user.controller';
import { authMiddleware } from './middleware/auth.middleware';

class RestRouter {
    public routes(): Router {
        const router = Router();

        // user
        router.post('/register', userController.register);
        router.post('/login', userController.login);
        router.get('/me', authMiddleware.authenticate, userController.me)
        
        return router;
    }
}

export const restRouter = new RestRouter();