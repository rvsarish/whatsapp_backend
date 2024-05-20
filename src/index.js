import dotenv from 'dotenv';

import app from './app.js';
import logger from './configs/logger.config.js';


dotenv.config();


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
    
});