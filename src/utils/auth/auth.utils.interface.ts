import { User } from "src/entities/user/user.model";
import { Request, NextFunction, Response } from "express";
import { LoggedUserDto } from "src/entities/auth/output/login.output.dto";

export type checkIsEmailTakenFunc = (mail: string) => Promise<void>;

export type findUserFunc = (mail: string) => Promise<User>;

export type hashPasswordFunc = (password: string) => Promise<string>;

export type checkPasswordFunc = (
  password: string,
  storedPassword: string,
) => Promise<boolean>;

export type generateJwtFunc = (user: User) => string;

export type checkValidJwtFunc = (givenToken: string) => void;

export type AttachUser = (userLogged: LoggedUserDto) => void;
