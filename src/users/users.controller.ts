import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserLoginDTO, CreateUserSignupDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/users/guard';
import { GetUser } from './decorator';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('signup')
  signup(@Body() createUserSignupDTO: CreateUserSignupDTO) {
    return this.usersService.signup(createUserSignupDTO);
  }


  @Post('signin')
  signin(@Body() createUserLoginDTO: CreateUserLoginDTO) {
    return this.usersService.signin(createUserLoginDTO)
  }


  @UseGuards(JwtGuard)
  @Get('findalluser')
  findAll() {
    return this.usersService.findAll()
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id: +id });
  }

  // @UseGuards(JwtGuard)
  // @Patch('updateProfile')
  // update(@Req()
  // req: Request,
  //   @Body()
  //   updateUserDto: UpdateUserDto) {

  //   if (!req.user) {
  //     throw new BadRequestException('User not found in request'); // Handle missing user
  //   }
  //   return this.usersService.update(req.user.id, updateUserDto);
  // }

  @UseGuards(JwtGuard)
  @Patch('updateProfile')
  update(@GetUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    if (!user || !user.id) {
      throw new BadRequestException('User not found in request');
    }
    return this.usersService.update(user.id, updateUserDto);
  }



  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(
    @Param('id')
    id: string,
    @GetUser()
    user: User
  ) {
    //Only allow admins to delete users
    if (user.role != 'admin') {
      throw new BadRequestException('You are not authorized to delete users');
    }
    return this.usersService.remove(+id);
  }
}
