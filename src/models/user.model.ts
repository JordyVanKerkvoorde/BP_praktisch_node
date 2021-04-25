import { Column, DataType, Model, Table } from "sequelize-typescript";
import { Roles } from "../domain/role.enum";

@Table({
    tableName: 'users',
    timestamps: true
})
export default class User extends Model {
    @Column({
        allowNull: false
    })
    uuid: string;

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
        allowNull: false
    })
    password: string;

    @Column({
        allowNull: false
    })
    salt: string;

    @Column({
        allowNull: false,
        type: DataType.ENUM('USER', 'EMPLOYEE','OWNER')
    })
    role: Roles
}