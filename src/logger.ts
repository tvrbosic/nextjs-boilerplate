// // LIB
import winston from 'winston';
import 'winston-daily-rotate-file';

// TYPES
const { combine, colorize, timestamp, printf, json, errors } = winston.format;

// ENV
const logDir = process.env.LOG_FOLDER;

// ============================| CONFIGURE TRANSPORTS |============================ //
const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: `${logDir}%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
  format: combine(errors({ stack: true }), timestamp(), json()),
});

const consoleTransport = new winston.transports.Console({
  format: combine(
    errors({ stack: true }),
    colorize(),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
});

// ============================| CREATE LOGGER |============================ //

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  transports: [consoleTransport, fileRotateTransport],
});

export default logger;
