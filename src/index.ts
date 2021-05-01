import { sequelize } from "./database/database.service";
import express, { Request, Response } from 'express';
import config from './config'
import { userController } from "./controllers/user.controller";
import bodyParser from 'body-parser';
import { restRouter } from "./rest.router";

sequelize.sync()
    .then(() => console.info('Sequelize connected...'))
    .catch((err) => console.error(err));

const app = express();

app.use(bodyParser.json({
    limit: '4096kb'
}));

app.use(restRouter.routes());

app.listen(config.api.port, () => {
    console.info(`API running on port: ${config.api.port}`)
})
