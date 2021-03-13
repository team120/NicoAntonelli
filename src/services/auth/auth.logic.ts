import * as queryFuncs from "../../utils/common/common.query.interface";
import * as authFuncs from "../../utils/auth/auth.utils.interface";
import { RegisterInputDto } from "../../entities/auth/input/register.input.dto";
import { User } from "../../entities/user/user.model";
import { plainToClass } from "class-transformer";
import { RegisteredUserDto } from "../../entities/auth/output/register.output.dto";
import { LoginInputDto } from "../../entities/auth/input/login.input.dto";
import { LoggedUserDto } from "../../entities/auth/output/login.output.dto";
import { SocialLoginDto } from "../../entities/auth/input/socialLogin.input.dto";
import { GoogleProfile } from "../../entities/auth/googleProfile.model";

export const registerLogic = (
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

export const loginLogic = (
  findUser: authFuncs.findUserFunc,
  checkPassword: authFuncs.checkPasswordFunc,
  generateJwt: authFuncs.generateJwtFunc,
) => (loginDto: LoginInputDto): Promise<LoggedUserDto> =>
  findUser(loginDto.mail).then((user) =>
    checkPassword(loginDto.password, user.password).then(() =>
      plainToClass(LoggedUserDto, {
        ...user,
        accessToken: `Bearer ${generateJwt(user)}`,
      }),
    ),
  );

export const isAuthLogic = (
  checkValidJwt: authFuncs.checkValidJwtFunc,
  getUserFromToken: authFuncs.getUserFromTokenFunc,
) => (userToken: string | undefined): Promise<User> => {
  const decodedToken = checkValidJwt(userToken);
  return getUserFromToken(decodedToken);
};

export const socialLoginLogic = (
  findUserFromProfile: authFuncs.findUserFromProfile,
  generateJwt: authFuncs.generateJwtFunc,
  save: queryFuncs.createQueryFunc,
) => async (socialLoginParams: SocialLoginDto): Promise<LoggedUserDto> => {
  const user = await findUserFromProfile(socialLoginParams.googleProfile.id);

  if (user === undefined) {
    await save(GoogleProfile, socialLoginParams.googleProfile);
    const newUser = await save(User, {
      ...socialLoginParams,
      isMailVerified: true,
    });
    return plainToClass(LoggedUserDto, {
      ...newUser,
      accessToken: `Bearer ${generateJwt(newUser)}`,
    });
  }

  return plainToClass(LoggedUserDto, {
    ...user,
    accessToken: `Bearer ${generateJwt(user)}`,
  });
};
