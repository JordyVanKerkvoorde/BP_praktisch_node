import { Request, Response } from 'express';
import { userMapper } from '../mappers/user.mapper';
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

    async me(req: Request, res: Response): Promise<Response> {
        try {
            return res.status(200).json(userMapper.toClientFormatSingle(req.auth.user));
        } catch(err) {
            return res.status(500).json('Error');
        }
    }
}

export const userController = new UserController();