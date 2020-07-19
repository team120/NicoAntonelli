import * as queryFuncs from "../../utils/common/common.query.interface";
import * as authFuncs from "../../utils/auth/auth.utils.interface";
import { RegisterInputDto } from "../../entities/auth/input/register.input.dto";
import { User } from "../../entities/user/user.model";
import { plainToClass } from "class-transformer";
import { RegisteredUserDto } from "../../entities/auth/output/register.output.dto";
import { LoginInputDto } from "../../entities/auth/input/login.input.dto";
import { LoggedUserDto } from "../../entities/auth/output/login.output.dto";
import { GoogleProfile } from "../../entities/auth/googleProfile";
import { profile } from "winston";
import { SocialLoginDto } from "src/entities/auth/input/socialLogin.input.dto";

export const registerLogicFactory = (
  checkIsEmailTaken: authFuncs.checkIsEmailTakenFunc,
  hashPassword: authFuncs.hashPasswordFunc,
  save: queryFuncs.createQueryFunc,
) => (registerDto: RegisterInputDto): Promise<RegisteredUserDto> =>
  checkIsEmailTaken(registerDto.mail)
    .then(() => hashPassword(registerDto.password))
    .then((hashedPassword) =>
      save(User, { ...registerDto, password: hashedPassword }),
    )
    .then((savedUser) => plainToClass(RegisteredUserDto, savedUser));

export const loginLogicFactory = (
  findUser: authFuncs.findUserFunc,
  checkPassword: authFuncs.checkPasswordFunc,
  generateJwt: authFuncs.generateJwtFunc,
) => (loginDto: LoginInputDto): Promise<LoggedUserDto> =>
  findUser(loginDto.mail).then((user) =>
    checkPassword(loginDto.password, user.password).then(() =>
      plainToClass(LoggedUserDto, {
        ...user,
        token: generateJwt(user),
      }),
    ),
  );

export const isAuthLogicFactory = (
  checkValidJwt: authFuncs.checkValidJwtFunc,
  getUserFromToken: authFuncs.getUserFromTokenFunc,
) => (userToken: string | undefined): Promise<User> => {
  const decodedToken = checkValidJwt(userToken);
  return getUserFromToken(decodedToken);
};

export const socialLoginLogicFactory = (
  findUserFromProfile: authFuncs.findUserFromProfile,
  save: queryFuncs.createQueryFunc,
) => async (socialLoginParams: SocialLoginDto): Promise<User> => {
  const user = await findUserFromProfile(socialLoginParams.googleProfile.id);

  if (user === undefined) {
    const newUser = save(User, plainToClass(User, socialLoginParams));
    return newUser;
  }

  return user;
};
