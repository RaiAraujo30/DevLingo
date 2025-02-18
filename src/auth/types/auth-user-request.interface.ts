import { Request } from 'express';
import { UserRole } from 'src/users/types/User.role';

export interface AuthUserRequest extends Request {
  user: {
    userId: string;
    username: string;
    role: string;
  };
}
