import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';
import logger from './configs/logger.config.js';


dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;
// , {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }
mongoose.connect(DATABASE_URL).then(() => {
    logger.info('Connected to MongoDB');
}).catch((error) => {
    logger.error(error.message);
});

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

process.on("SIGTERM", () => {
    if (server) {
      logger.info("Server closed.");
      process.exit(1);
    }
  });

