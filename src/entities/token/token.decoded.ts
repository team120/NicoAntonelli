import { TokenPayload } from "./token.payload";

export class TokenDecoded implements TokenPayload {
  id: number;
  mail: string;
  name: string;
  iat: number;
  exp: number;
}
