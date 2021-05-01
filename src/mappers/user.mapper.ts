import User from "../models/user.model";
import BaseMapper from "./base.mapper";

class UserMapper extends BaseMapper<User>{
    public fromClientFormatSingle(object: any) {
        throw new Error("Method not implemented.");
    }

    public toClientFormatSingle(user: User) {
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            dateOfBirth: user.dateOfBirth,
            role: user.role
        };
    }

}

export const userMapper = new UserMapper();