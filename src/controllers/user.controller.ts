import { Request, Response } from 'express';
import { userService } from '../services/user.service';

class UserController {
    async register(req: Request, res: Response): Promise<Response> {
        try {
            const user = await userService.register(req.body);
    
            return res.status(200).json(user);
        } catch(err) {
            console.error(err);
            return res.status(500).json('Error');
        }
    }

    async login(req: Request, res: Response): Promise<Response> {
        try {
            const user = await userService.login(req.body);
    
            return res.status(200).json(user);
        } catch(err) {
            console.error(err);
            return res.status(500).json(err);
        }
    }
}

export const userController = new UserController();