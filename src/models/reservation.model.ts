import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import User from "./user.model";
import Venue from "./venue.model";

@Table({
    tableName: 'reservations',
    timestamps: true
})
export default class Reservation extends Model {
    @Column({
        allowNull: false
    })
    spots: number;

    @Column({
        allowNull: false
    })
    reservationDate: Date;

    @Column({
        allowNull: false
    })
    createdAt: Date;

    @Column({
        allowNull: false
    })
    @ForeignKey(() => Venue)
    venueId: number;

    // @BelongsTo(() => Venue, {
    //     onUpdate: 'CASCADE',
    //     onDelete: 'CASCADE'
    // })
    // venue: Venue

     @Column({
        allowNull: false
    })
    @ForeignKey(() => User)
    userId: number;

    // @BelongsTo(() => User, {
    //     onUpdate: 'CASCADE',
    //     onDelete: 'CASCADE'
    // })
    // user: User
}