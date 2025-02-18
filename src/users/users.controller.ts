import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, HttpStatus, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, Roles } from 'src/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/jwtAuthGuard';
import { UserRole } from './types/User.role';
import { User } from './entities/user.entity';
import { UserRequest } from './types/User.request';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      if (error.message === 'Email already in use') {
        throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Req() request: UserRequest, @Param('id') id: string) {
    const requestingUser = request.user; // Pega os dados do usuário autenticado

    await this.usersService.deleteUser(requestingUser.userId, id, requestingUser.role);
    return { message: 'Usuário excluído com sucesso' };
  }
}
