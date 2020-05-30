enum ErrorType {
  DbError = "DbError",
  NotFoundError = "NotFoundError",
}

enum LogLevel {
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

const displayFatalError = (code: number): string =>
  `Something went wrong. Error code: ${code}. Please contact support`;

export const DbError = (message: string, stack?: string): AppError =>
  new AppError({
    status: 500,
    type: ErrorType.DbError,
    displayMessage: displayFatalError(9845),
    logLevel: LogLevel.error,
    message: message,
    stack: stack,
  });

const message = (id: number): string => `Item ${id} not found`;

export const NotFoundError = (itemId: number): AppError =>
  new AppError({
    status: 404,
    type: ErrorType.NotFoundError,
    displayMessage: message(itemId),
    logLevel: LogLevel.info,
    message: message(itemId),
  });
