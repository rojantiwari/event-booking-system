import { BadRequestException, Injectable } from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prismaService/prisma.service';
import { User } from '@prisma/client';
import { CreateUserSignupDto } from './dto/create-user-signup.dto';
import { CreateUserLoginDTO } from './dto/create-user-login.dto';
import * as argon from 'argon2'

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService
  ) { }


  async signup(createUserSignupDTO: CreateUserSignupDto): Promise<Omit<User, 'password'>> {
    // Check if email already exists
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        email: createUserSignupDTO.email,
      },
    });

    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await argon.hash(createUserSignupDTO.password);
    const user = await this.prismaService.user.create({
      data: {
        name: createUserSignupDTO.name,
        email: createUserSignupDTO.email,
        password: hashedPassword,
        role: createUserSignupDTO.role || 'admin', // Default to admin if role is not provided
        profile: createUserSignupDTO.profile || null, // Default to null if profile is not provided
      },
    });

    // Exclude the password from the returned user object
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword; // Adjusted return type
  }


  async login(createUserLoginDTO: CreateUserLoginDTO): Promise<Omit<User, 'password'>> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: createUserLoginDTO.email,
      }
    })

    //if user doesnot exist throw  exception 
    if (!user) {
      throw new Error('User not found');
    }

    // Verify the password
    const isPasswordValid = await argon.verify(user.password, createUserLoginDTO.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;

  }

  findAll() {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        profile: true,
        createdDt: true,
        updateAt: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
