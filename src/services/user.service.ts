import crypto from 'crypto';
import User from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';
import * as jwt from 'jsonwebtoken';
import config from '../config'

class UserService {

    register(data: any): Promise<User> {
        const hash = this.encryptPassword(data.password);
        data.password = hash.password;
        data.salt = hash.salt;
        // temp
        data.dateOfBirth = new Date().toISOString();
        data.uuid = uuidv4();

        return User.create(data);
    }

    encryptPassword(password: string) {
        const salt = crypto.randomBytes(Math.ceil(8))
        .toString('hex')
        .slice(0, 16);

        return this.hashPassword(password, salt);
    }

    hashPassword(password: string, salt: string): { password: string, salt: string } {
        const hash = crypto.createHmac('sha512', salt);
        hash.update(password);
        password = hash.digest('hex');

        return {
            password,
            salt
        }
    }

    checkPassword(password: string, hash: string, salt: string) {
        return this.hashPassword(password, salt).password === hash;
    }

    getUserByEmail(email: string): Promise<User | null> {
        return User.findOne({ where: { email }});
    }

    async login(data: any){
        try {
            const user = await this.getUserByEmail(data.email);
    
            if(!user) throw Error(`User not found with email: ${data.email}`);
            if(!this.checkPassword(data.password, user.password, user.salt)) throw Error('Password incorrect');

            const token = jwt.sign({user: user.get()}, config.jwt.secret, { expiresIn: '1d'});

            return token;
        } catch(err) {
            console.error(err);
        }
    }
}

export const userService = new UserService();