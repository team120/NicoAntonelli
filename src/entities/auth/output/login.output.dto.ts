import { Exclude, Expose } from "class-transformer";

@Exclude()
export class LoggedUserDto {
  @Expose()
  name: string;
  @Expose()
  mail: string;
  @Expose()
  token: string;
}
