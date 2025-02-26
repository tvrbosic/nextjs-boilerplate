// // LIBRARY
import winston from 'winston';
import 'winston-daily-rotate-file';

const { combine, colorize, timestamp, printf, json, errors } = winston.format;

const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
  format: combine(errors({ stack: true }), timestamp(), json()),
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  transports: [
    new winston.transports.Console({
      format: combine(
        errors({ stack: true }),
        colorize(),
        timestamp({
          format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
      ),
    }),
    fileRotateTransport,
  ],
});

export default logger;
