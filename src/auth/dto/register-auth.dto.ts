import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterAuthDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsNotEmpty()
    @IsString()
    apellido: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;
}
