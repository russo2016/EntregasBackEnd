import winston from 'winston';

const MODE = process.env.MODE || 'DEV';

const logLevels = {
    levels: {
        debug: 0,
        http: 1,
        info: 2,
        warning: 3,
        error: 4,
        fatal: 5
    }
};

const devLogger = winston.createLogger({
    levels: logLevels.levels,
    transports: [
        new winston.transports.Console()
    ],
    level: 'debug' 
});

const prodLogger = winston.createLogger({
    levels: logLevels.levels,
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'errors.log', level: 'error' })
    ],
    level: 'info'
});

const getLogger = () => {
    return MODE.toUpperCase() === 'DEV' ? devLogger : prodLogger;
}

export default getLogger;
