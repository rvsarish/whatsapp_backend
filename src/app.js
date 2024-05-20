import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import fileUpload from 'express-fileupload';
import createHttpError from 'http-errors'; // Corrected import name
import routes from './routes/index.js';

dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));
app.use(mongoSanitize());
app.use(helmet());
app.use(cors());
app.use(compression());
app.use('/api/v1', routes);
app.get('/test', (req, res) => {
    // throw createhttpError.BadRequest('Route has an error');
    res.send('Hello World');
});
app.use(async (req, res, next) => {
    next(createHttpError.NotFound("This route does not exist."));
});

app.use(async (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});

export default app;