import dotenv from 'dotenv';

import app from './app.js';
import logger from './configs/logger.config.js';


dotenv.config();


const PORT = process.env.PORT || 8000;
let server;

server = app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
    // throw new Error('This is an error');
});

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    if(server) {
        logger.info(`Server closed`);
            process.exit(1);
    } else {
        process.exit(1);
    }
};
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);