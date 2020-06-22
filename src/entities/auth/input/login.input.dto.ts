import { Exclude, Expose } from "class-transformer";
import { Trim, Escape, NormalizeEmail } from "@neuralegion/class-sanitizer";
import { IsNotEmpty, IsEmail } from "class-validator";

@Exclude()
export class LoginInputDto {
  @Expose()
  @NormalizeEmail()
  @IsEmail()
  @IsNotEmpty()
  mail: string;
  @Expose()
  @Trim()
  @Escape()
  @IsNotEmpty()
  password: string;
}
