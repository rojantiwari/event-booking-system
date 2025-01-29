import { TYPEOPTION } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";



export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string

    @IsString()
    @IsNotEmpty()
    readonly description: string

    @IsString()
    @IsNotEmpty()
    readonly location: string

    @Transform(({ value }) => new Date(value))
    @IsDate()
    readonly date: Date

    @IsOptional()
    @IsString()
    readonly status?: TYPEOPTION

    // @IsNotEmpty()
    // @IsInt() // Ensures userId is a valid integer
    // readonly userId: number;



}
