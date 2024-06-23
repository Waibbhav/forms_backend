import { IsEmail, IsNotEmpty, IsString } from "class-validator";
export class UserCreate {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    phone: string;

    @IsString()
    address: string;
}