import * as queryFuncs from "../../utils/common/common.query.interface";
import * as authFuncs from "../../utils/auth/auth.utils.interface";
import { RegisterInputDto } from "../../entities/auth/input/register.input.dto";
import { User } from "../../entities/user/user.model";
import { plainToClass } from "class-transformer";
import { RegisteredUserDto } from "../../entities/auth/output/register.output.dto";

export const registerLogicFactory = (
  checkIsEmailTaken: authFuncs.checkIsEmailTakenFunc,
  hashPassword: authFuncs.hashPasswordFunc,
  save: queryFuncs.saveQueryFunc,
) => (registerDto: RegisterInputDto): Promise<RegisteredUserDto> =>
  checkIsEmailTaken(registerDto.mail)
    .then(() => hashPassword(registerDto.password))
    .then((hashedPassword) =>
      save(User, { ...registerDto, password: hashedPassword }),
    )
    .then((savedUser) => plainToClass(RegisteredUserDto, savedUser));
