import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [PrismaService, UsersService, JwtService, AuthService],
})
export class AuthModule {}
