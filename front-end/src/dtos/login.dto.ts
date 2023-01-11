import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsNotEmpty({ message: "Você precisa informar o seu email" })
    @IsString()
    @IsEmail()
    email?: string;

    @IsNotEmpty({ message: "Você precisa informar a sua senha" })
    @IsString()
    password?: string;
}