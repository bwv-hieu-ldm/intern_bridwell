import { IsNotEmpty, IsString, Matches } from "class-validator";

export class LoginReqDto {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'Password must be at least 8 characters long, contain at least one letter and one number.'
  })
  password!: string;
}