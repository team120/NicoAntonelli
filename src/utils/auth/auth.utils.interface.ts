import { User } from "src/entities/user/user.model";
import { TokenDecoded } from "src/entities/token/token.decoded";

export type checkIsEmailTakenFunc = (mail: string) => Promise<void>;

export type findUserFunc = (mail: string) => Promise<User>;

export type hashPasswordFunc = (password: string) => Promise<string>;

export type checkPasswordFunc = (
  password: string,
  storedPassword: string,
) => Promise<boolean>;

export type generateJwtFunc = (user: User) => string;

export type checkValidJwtFunc = (givenToken: string) => TokenDecoded;

export type getUserFromTokenFunc = (userToken: TokenDecoded) => Promise<User>;
