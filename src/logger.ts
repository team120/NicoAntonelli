import { createLogger, transports, format } from "winston";

const consoleOptions: transports.ConsoleTransportOptions = {
  handleExceptions: true,
  format: format.json(),
};

export const logger = createLogger({
  transports: [new transports.Console(consoleOptions)],
  exitOnError: false,
});
