import winston, { createLogger } from "winston"

// Define the custom settings for each transport (file, console)
const options = {
  file: {
    level: "info",
    filename: "/logs/app.log",
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

// Instantiate a new Winston Logger with the settings defined above
export const logger = createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false, // Do not exit on handled exceptions
});
