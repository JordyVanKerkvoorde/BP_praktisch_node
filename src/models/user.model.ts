import { Column, DataType, Model, Table } from "sequelize-typescript";
import { Roles } from "./role.enum";

@Table({
    tableName: 'users',
    timestamps: true
})
export default class User extends Model {
    @Column({
        allowNull: false
    })
    firstName: string;

    @Column({
        allowNull: false
    })
    lastName: string;

    @Column({
        allowNull: false
    })
    dateOfBirth: Date;

    @Column({
        allowNull: false
    })
    email: string;

    @Column({
        allowNull: false,
        type: DataType.ENUM('USER', 'EMPLOYEE','OWNER')
    })
    role: Roles
}