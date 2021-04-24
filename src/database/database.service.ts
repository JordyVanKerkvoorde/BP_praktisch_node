import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { Dialect } from "sequelize";
import config from "../config";
import path from "path";

export const sequelize = new Sequelize({
    database: config.database.dbname,
    dialect: config.database.driver as Dialect,
    username: config.database.username,
    password: config.database.password,
    // storage: null,
    host: config.database.host,
    server: config.database.host,
    port: Number(config.database.port),
    define: {
        charset: config.database.charset,
        collate: config.database.collate
    },
    modelPaths: [
        path.resolve(`${__dirname}/models`),
    ],
    logging: config.log.sequelize ? (msg: string) => console.info(msg) : false
} as SequelizeOptions)