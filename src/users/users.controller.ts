import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Post()
  @ApiOperation({summary: 'Crear usuario'})
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiResponse({status: 200, description: 'retorna todos los usuarios'})
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiResponse({status: 200, description: 'retorna un solo usuarios'})
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  @ApiOperation({summary: 'Actualiza un usuario'})
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @ApiOperation({summary: 'Elimina un usuario'})
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
