import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';
import logger from './configs/logger.config.js';

dotenv.config();

const PORT = process.env.PORT || 8000;

const DATABASE_URL = process.env.DATABASE_URL;
if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
// , {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected to Mongodb.");
  });
  mongoose.connection.on("error", (err) => {
    logger.error(`Mongodb connection error : ${err}`);
    process.exit(1);
  });
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

