import * as queryFuncs from "../../utils/common/common.query.interface";
import * as authQueryFuncs from "../../utils/auth/auth.query.interface";
import * as argon2 from "argon2";
import { RegisterInputDto } from "../../entities/auth/input/register.input.dto";
import { User } from "../../entities/user/user.model";
import { plainToClass } from "class-transformer";
import { RegisteredUserDto } from "../../entities/auth/output/register.output.dto";

export const registerLogicFactory = (
  checkIsEmailTaken: authQueryFuncs.checkIsEmailTakenFunc,
  save: queryFuncs.saveQueryFunc,
) => (registerDto: RegisterInputDto): Promise<RegisteredUserDto> =>
  checkIsEmailTaken(registerDto.mail)
    .then(() => argon2.hash(registerDto.password))
    .then((hashedPassword) =>
      save(User, { ...registerDto, password: hashedPassword }),
    )
    .then((savedUser) => plainToClass(RegisteredUserDto, savedUser));
