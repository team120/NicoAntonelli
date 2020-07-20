import { Exclude, Expose } from "class-transformer";

@Exclude()
export class LoggedUserDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  lastName: string;
  @Expose()
  mail: string;
  @Expose()
  accessToken: string;
  @Expose()
  refreshToken: string;
}
