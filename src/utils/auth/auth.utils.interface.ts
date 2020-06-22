import { User } from "src/entities/user/user.model";

export type checkIsEmailTakenFunc = (mail: string) => Promise<void>;

export type findUserFunc = (mail: string) => Promise<User>;

export type hashPasswordFunc = (password: string) => Promise<string>;

export type checkPasswordFunc = (
  password: string,
  storedPassword: string,
) => Promise<boolean>;
