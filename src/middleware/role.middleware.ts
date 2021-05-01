import { NextFunction, Request, Response } from 'express';
import { Roles } from '../domain/role.enum'

class RoleMiddleware {
    init() {
        let middleware = Object.create(null);
        // dynamically allocate functions for simplified role guarding
        Object.keys(Roles).forEach(role => {
            middleware[role.toLocaleLowerCase()] = (req: Request, res: Response, next: NextFunction) => {
                const userRole = req.auth.user.role;
                if(userRole === role) next();

                return res.status(401).json('Forbidden');
            } 
        })

        return middleware;
    }
}

export const roleMiddleware = new RoleMiddleware().init();