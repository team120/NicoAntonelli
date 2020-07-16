import { Expose, Exclude } from "class-transformer";

@Exclude()
export class RegisteredUserDto {
  @Expose()
  name: string;
  @Expose()
  mail: string;
}
