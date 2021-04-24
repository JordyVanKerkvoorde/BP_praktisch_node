import { Column, Model, Table } from "sequelize-typescript";

@Table({
    tableName: 'venues',
    timestamps: true
})
export default class Venue extends Model {
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
}