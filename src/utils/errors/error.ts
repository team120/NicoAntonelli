export enum ErrorType {
  DbError = "DbError",
  NotFoundError = "NotFoundError",
  MailAlreadyTaken = "MailAlreadyTaken",
  NonExistentUser = "NonExistentUser",
  IncorrectPassword = "IncorrectPassword",
  EnvError = "EnvError",
  Unauthorized = "Unauthorized",
}

export enum LogLevel {
  emerg = "emerg",
  alert = "alert",
  crit = "crit",
  error = "error",
  warning = "warning",
  notice = "notice",
  info = "info",
  debug = "debug",
}

export class AppError extends Error {
  status: number;
  displayMessage: string;
  logLevel: LogLevel;

  constructor(params: {
    status: number;
    message: string;
    displayMessage: string;
    type: ErrorType;
    logLevel: LogLevel;
    stack?: string;
  }) {
    super(params.message);
    this.name = params.type;
    this.message = params.message;
    this.status = params.status;
    this.displayMessage = params.displayMessage;
    this.logLevel = params.logLevel;
    this.stack = params.stack;
  }
}
