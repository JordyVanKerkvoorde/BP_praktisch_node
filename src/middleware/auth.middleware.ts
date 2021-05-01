import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import config from '../config'

class AuthMiddleware {
    public authenticate(req: Request, res: Response, next: NextFunction) {
        try{
            const header = req.headers.authorization;
    
            if(typeof header !== 'undefined') {
                const bearer = header.split(' ')[1];
                const decoded: any = jwt.verify(bearer, config.jwt.secret);
                req.auth = {
                    user: decoded.user
                };
                
                return next();
            } else {
                return res.status(401).json("Unauthorized");
            }
        } catch(err) {
            console.error(err);
        }
    }
}

export const authMiddleware = new AuthMiddleware();