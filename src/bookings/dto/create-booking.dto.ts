import { TYPEOPTION } from "@prisma/client";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBookingDto {


    @IsString()
    @IsOptional()
    readonly ticketType?: TYPEOPTION


    @IsInt()
    @IsNotEmpty()
    readonly quantity: number

    @IsString()
    @IsOptional()
    readonly status?: TYPEOPTION


    readonly userId: number


    @IsInt()
    @IsNotEmpty()
    readonly eventId: number


}
