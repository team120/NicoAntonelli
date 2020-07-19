import { AppError, ErrorType, LogLevel } from "./error";

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

export const EnvError = (message: string): AppError =>
  new AppError({
    status: 500,
    type: ErrorType.EnvError,
    displayMessage: displayFatalError(9555),
    logLevel: LogLevel.error,
    message: message,
  });

const notFoundMessage = (id: string): string => `Item ${id} not found`;

export const NotFoundError = (itemId: string): AppError =>
  new AppError({
    status: 404,
    type: ErrorType.NotFoundError,
    displayMessage: notFoundMessage(itemId),
    logLevel: LogLevel.info,
    message: notFoundMessage(itemId),
  });

export const MailAlreadyTaken = (mail: string): AppError =>
  new AppError({
    status: 400,
    type: ErrorType.MailAlreadyTaken,
    displayMessage: `${mail} is already taken. Please use another one`,
    logLevel: LogLevel.info,
    message: `A user tried to register with already taken ${mail}`,
  });

export const NotFoundUser = (mail: string): AppError =>
  new AppError({
    status: 401,
    type: ErrorType.NonExistentUser,
    displayMessage: `Invalid credentials`,
    logLevel: LogLevel.info,
    message: `User not found with mail ${mail}`,
  });

export const IncorrectPassword = (): AppError =>
  new AppError({
    status: 401,
    type: ErrorType.IncorrectPassword,
    displayMessage: `Invalid credentials`,
    logLevel: LogLevel.info,
    message: `Password didn't match`,
  });

export const Unauthorized = (message: string): AppError =>
  new AppError({
    status: 401,
    type: ErrorType.Unauthorized,
    displayMessage: `Unauthorized`,
    logLevel: LogLevel.warn,
    message: message,
  });
