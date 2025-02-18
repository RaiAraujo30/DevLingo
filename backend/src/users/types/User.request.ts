import { Request } from 'express';
import { UserRole } from 'src/users/types/User.role';

export interface UserRequest extends Request {
  user: {
    userId: string;
    username: string;
    role: UserRole;
  };
}
