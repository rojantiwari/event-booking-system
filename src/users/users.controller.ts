import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserSignupDto } from './dto/create-user-signup.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { CreateUserLoginDTO } from './dto/create-user-login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('signup')
  signup(@Body() createUserSignupDTO: CreateUserSignupDto): Promise<Omit<User, 'password'>> {
    return this.usersService.signup(createUserSignupDTO);
  }


  @Post('login')
  login(@Body() createUserLoginDTO: CreateUserLoginDTO): Promise<Omit<User, 'password'>> {
    return this.usersService.login(createUserLoginDTO)
  }



  @Get('findUser')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('findUserById/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
