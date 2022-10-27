/* const fs = */require('fs');
const {format, createLogger, transports} = require('winston');
const {combine, timestamp, printf, colorize, align} = format;
/* const CATEGORY = 'Journey Logger';*/


const logger = createLogger({
  level: 'debug',
  format: combine(
      colorize({all: true}),
      timestamp({
        format: 'MMM-DD-YYYY HH:mm:ss',
      }),
      align(),
      printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
  ),
  transports: [
    new transports.File({
      filename: './example.log',
      level: 'info',
    }),
    new transports.Console({
      level: 'debug',
    }),
  ],
});

module.exports = logger;
