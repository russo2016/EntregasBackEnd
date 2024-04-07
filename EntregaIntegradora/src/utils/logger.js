import winston from 'winston';

const MODE = process.env.MODE || 'DEV';

const logLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
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
