const winston = require('winston');
const { format } = winston;
const { signIn } = require('../controllers/users');
const { json } = require('express');


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        format.timestamp(),
        format.json()
    ),
    defaultMeta:{service: 'request-logging'},
    transports:[
        new winston.transports.File({filename:'logs.txt'})
    ]

});

const loggerMiddleware = async (req, res, next)=>{
    const signInUrl = '/api/user/signIn';
    if(req.url !== signInUrl){
        const logData = `${req.url} - ${JSON.stringify(req.body)}`;
        logger.info(logData);
    }
    next();
}

module.exports = loggerMiddleware;