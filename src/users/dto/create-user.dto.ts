import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { UserRole } from '../types/User.role';

export class CreateUserDto {
    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;

    @IsEnum(UserRole, { message: 'Role must be either user or admin' })
    role: UserRole;
}
