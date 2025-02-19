import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
  Req,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, Roles } from 'src/decorators/public.decorator';
import { JwtAuthGuard } from 'src/auth/jwtAuthGuard';
import { UserRole } from './types/User.role';
import { User } from './entities/user.entity';
import { UserRequest } from './types/User.request';
import { RolesGuard } from 'src/auth/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { Express, Multer } from 'multer';
import { AuthUserRequest } from 'src/auth/types/auth-user-request.interface';

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
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('current-user')
  async getCurrentUser(@Req() request: AuthUserRequest) {
    // userId vem do token decodificado
    const userId = request.user.id;

    // Agora buscamos o usuário no banco de dados
    const user = await this.usersService.findById(userId);

    // Retorne o objeto completo (ou apenas as propriedades que você quiser)
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Put('me/profile-picture')
  @UseInterceptors(
    FileInterceptor('profile_picture', {
      storage: diskStorage({
        destination: './uploads/profile-pictures',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtName = extname(file.originalname);
          const fileName = `${uniqueSuffix}${fileExtName}`;
          cb(null, fileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return cb(
            new HttpException(
              'Apenas arquivos de imagem são permitidos!',
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async updateProfilePicture(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request & { user: any },
  ) {
    console.log('Arquivo recebido no backend:', file);
    if (!file) {
      throw new HttpException('Nenhum arquivo enviado', HttpStatus.BAD_REQUEST);
    }
    const userId = req.user.id;
    const updatedUser = await this.usersService.updateProfilePicture(
      userId,
      file.filename,
    );
    console.log('Usuário atualizado:', updatedUser);
    return updatedUser;
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

    await this.usersService.deleteUser(
      requestingUser.userId,
      id,
      requestingUser.role,
    );
    return { message: 'Usuário excluído com sucesso' };
  }

  @UseGuards(JwtAuthGuard)
  @Post(':targetUserId/follow')
  async followUser(
    @Param('targetUserId') targetUserId: string,
    @Req() request: Request & { user: User },
  ) {
    const currentUserId = request.user.id;
    await this.usersService.followUser(currentUserId, targetUserId);
    return { message: 'Usuário seguido com sucesso.' };
  }

  // Endpoint para deixar de seguir um usuário (rota protegida)
  @UseGuards(JwtAuthGuard)
  @Delete(':targetUserId/follow')
  async unfollowUser(
    @Param('targetUserId') targetUserId: string,
    @Req() request: Request & { user: User },
  ) {
    const currentUserId = request.user.id;
    await this.usersService.unfollowUser(currentUserId, targetUserId);
    return { message: 'Deixou de seguir o usuário.' };
  }

  // Endpoint para obter os seguidores de um usuário (público)
  @Get(':userId/followers')
  async getFollowers(@Param('userId') userId: string) {
    const followers = await this.usersService.getFollowers(userId);
    return followers;
  }

  // Endpoint para obter os usuários que o usuário está seguindo (público)
  @Get(':userId/following')
  async getFollowing(@Param('userId') userId: string) {
    const following = await this.usersService.getFollowing(userId);
    return following;
  }
}
