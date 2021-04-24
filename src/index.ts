import { sequelize } from "./database/database.service";


sequelize.sync()
    .then(() => console.info('Sequelize connected...'))
    .catch((err) => console.error(err));