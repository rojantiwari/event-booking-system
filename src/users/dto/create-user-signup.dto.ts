import { ROLE } from "@prisma/client";
import { IsNotEmpty, IsString, Length } from "class-validator";


export class CreateUserSignupDto {

    @IsString()
    @IsNotEmpty()
    readonly name: string

    @IsString()
    @Length(8, 14)
    readonly password: string

    @IsString()
    @IsNotEmpty()
    readonly email: string

    @IsString()
    readonly role?: ROLE

    @IsString()
    readonly profile?: string
}
