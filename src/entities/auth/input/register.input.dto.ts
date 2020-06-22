import { IsEmail, MinLength, Length, IsNotEmpty } from "class-validator";
import { NormalizeEmail, Trim, Escape } from "@neuralegion/class-sanitizer";
import { Expose, Exclude } from "class-transformer";

@Exclude()
export class RegisterInputDto {
  @Expose()
  @Trim()
  @Escape()
  @IsNotEmpty()
  name: string;

  @Expose()
  @Trim()
  @IsNotEmpty()
  @IsEmail()
  @NormalizeEmail()
  mail: string;

  @Expose()
  @Trim()
  @Escape()
  @IsNotEmpty()
  @MinLength(8, { message: "La contraseña debe tener al menos 8 caracteres" })
  password: string;

  @Expose()
  @Trim()
  @Escape()
  @IsNotEmpty()
  university: {
    id: number;
  };
}
