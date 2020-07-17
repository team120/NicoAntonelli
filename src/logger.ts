import { createLogger, transports, format } from "winston";
import { info } from "console";

export const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.colorize(),
    format.align(),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new (transports.Console)({
      handleExceptions: true,
      level: "info"
    })
  ],
  exitOnError: false,
});
