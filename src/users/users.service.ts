import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { CreateUserLoginDTO, CreateUserSignupDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prismaService/prisma.service';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { SetTokenService } from 'src/utils/set-token';

@Injectable()
export class UsersService {

  constructor(
    private prismaService: PrismaService,
    private setTokenService: SetTokenService
  ) { }


  async signup(createUserSignupDto: CreateUserSignupDTO) {
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        email: createUserSignupDto.email
      }
    })

    if (existingUser) {
      throw new BadRequestException('Email Already Exist')
    }

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(createUserSignupDto.password, salt)

    const savedUser = await this.prismaService.user.create({
      data: {
        name: createUserSignupDto.name,
        email: createUserSignupDto.email,
        password: hashedPassword,
        role: createUserSignupDto.role || 'admin',
        profile: createUserSignupDto.profile || null
      }
    })

    return savedUser
  }


  async signin(createUserLoginDTO: CreateUserLoginDTO) {

    const user = await this.prismaService.user.findFirst({
      where: {
        email: createUserLoginDTO.email
      }
    })

    if (!user) {
      throw new BadRequestException("User not found")
    }

    //compare password

    const isPasswordValid = await bcrypt.compare(createUserLoginDTO.password, user.password)

    if (!isPasswordValid) {
      throw new BadRequestException("Password is not correct")
    }

    // Check if the provided role matches the stored role
    if (createUserLoginDTO.role !== user.role) {
      throw new BadRequestException("Invalid role for this user");
    }

    return this.setTokenService.signToken(user.id, user.email)
  }

  findAll() {
    return this.prismaService.user.findMany();
  }


  findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findFirst({
      where: userWhereUniqueInput
    });
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {

    //fetching the existing user 

    const existingUser = await this.prismaService.user.findUnique({
      where: { id: userId }
    })

    if (!existingUser) {
      throw new BadRequestException(`User with ID ${userId} not found`)
    }

    //update user detailed 

    const updatedUser = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        name: updateUserDto.name || existingUser.name,
        email: updateUserDto.email || existingUser.email,
        password: existingUser.password,
        role: updateUserDto.role || existingUser.role,
        profile: updateUserDto.profile || existingUser.profile,
        updateAt: new Date(), // Automatically updated by Prisma
      }
    })

    return updatedUser
  }



  async remove(id: number) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { id },
    })

    if (!existingUser) {
      throw new BadRequestException(`User with ${id} not found`)
    }

    await this.prismaService.user.delete({
      where: { id }
    })

    return { message: `User with ID ${id} deleted successfully` };
  }


}
