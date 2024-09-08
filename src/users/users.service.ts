import { PrismaService } from './../prisma/prisma.service';
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {  Prisma } from '@prisma/client';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(private PrismaService: PrismaService){}

  async create(createUserDto: CreateUserDto) {
    try {

      const newUser = await this.PrismaService.user.create({
        data: {
          ...createUserDto,
          Passwork_hash: await hash(createUserDto.Passwork_hash, 10),
        },
      });
      const { Passwork_hash, ...result } = newUser;
      return result;

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError){
        if (error.code == 'P2002'){
          throw new ConflictException(`username·o·email·ya·existe·${createUserDto.username}`);
        }
      }
      throw new InternalServerErrorException();
    };
    
  }

  findAll() {
    return this.PrismaService.user.findMany();
  }

  async findOne(id: number) {
    const User = await this.PrismaService.user.findUnique({
      where: {
        id: id
      }
    })
    if (!User) {
      throw new NotFoundException(`no se encontro el usuario con el id ${id} error`)
    }
    const { Passwork_hash, ...userWithoutPassword } = User;
    return userWithoutPassword;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const UserUpdate = await this.PrismaService.user.update({
      where: {
        id
      },
      data: {
        ...updateUserDto,
        Passwork_hash: await hash(updateUserDto.Passwork_hash, 10),
      },
    })

    if (!UserUpdate){
      throw new NotFoundException(`no se actualizo el usuario con el id ${id} error`)
    }

    return UserUpdate;
  }

  async remove(id: number) {
    const deleteUser = await this.PrismaService.user.delete({
      where: {
        id
      }
    })

    if (!deleteUser){
      throw new NotFoundException(`no se encontro el usuario con el id ${id} error`)
    }

    return deleteUser;
  }

  async findByEmail(username: string) {
    return await this.PrismaService.user.findUnique({
      where: {
        username: username,
      },
    });
  }
}
