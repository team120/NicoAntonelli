import { LoggedUserDto } from "src/entities/auth/output/login.output.dto";


declare module 'express-serve-static-core' {
    interface Request {
      userLogged?: LoggedUserDto
    }
    interface Response {
      userLogged?: LoggedUserDto
    }
  }