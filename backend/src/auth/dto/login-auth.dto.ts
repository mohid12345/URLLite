
import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class LoginAuthDto {
   
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6, {
        message: 'Password must be at least 6 characters long',
      })
      @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      })
    password: string;
    refreshToken: string;
}
