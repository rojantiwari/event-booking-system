import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prismaService/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/users/strategy';
import { SetTokenService } from 'src/utils/set-token';

@Module({
  imports: [JwtModule.register({
    global: true
  })],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, JwtStrategy, SetTokenService],
})
export class UsersModule { }
