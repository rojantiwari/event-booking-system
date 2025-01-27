import { ROLE } from "@prisma/client";
import { IsNotEmpty, IsString, Length } from "class-validator";


export class CreateUserLoginDTO {
    @IsString()
    @IsNotEmpty()
    readonly email: string

    @IsString()
    @IsNotEmpty()
    @Length(8, 14)
    readonly password: string

    @IsString()
    readonly role?: ROLE

}