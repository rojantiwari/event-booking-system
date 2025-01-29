
import { ROLE } from "@prisma/client";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserSignupDTO {

    @IsString()
    @IsNotEmpty()
    readonly name: string

    @IsString()
    @IsNotEmpty()
    readonly email: string


    @IsString()
    @IsNotEmpty()
    readonly password: string

    @IsString()
    @IsOptional()
    readonly role?: ROLE

    @IsString()
    @IsOptional()
    readonly profile?: string
}



export class CreateUserLoginDTO {
    @IsString()
    @IsNotEmpty()
    readonly email: string

    @IsString()
    @IsNotEmpty()
    readonly password: string

    @IsString()
    readonly role: ROLE


}
