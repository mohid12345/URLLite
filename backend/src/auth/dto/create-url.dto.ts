import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class CreateUrlDto {
    @IsString()
    url: string;
}
