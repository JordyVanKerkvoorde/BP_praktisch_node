import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import User from "./user.model";

@Table({
    tableName: 'venues',
    timestamps: true
})
export default class Venue extends Model {
    @Column({
        allowNull: false
    })
    uuid: string;

    @Column({
        allowNull: false
    })
    name: string;

    @Column({
        allowNull: true
    })
    longitude: number;

    @Column({
        allowNull: true
    })
    latitude: number;

    @Column({
        allowNull: true
    })
    address: string;

    @Column({
        allowNull: true
    })
    availableSpots: number;

    @Column({
        allowNull: false
    })
    @ForeignKey(() => User)
    ownerId: number;
}