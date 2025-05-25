import { User } from '../entities/user';

/**
 * User API response wrapper
 */
export interface UserResponse {
  user: User;
}

/**
 * User registration request
 */
export interface UserRegistrationRequest {
  user: {
    username: string;
    email: string;
    password: string;
  };
}

/**
 * User login request
 */
export interface UserLoginRequest {
  user: {
    email: string;
    password: string;
  };
}

/**
 * User update request
 */
export interface UserUpdateRequest {
  user: {
    email?: string;
    username?: string;
    password?: string;
    bio?: string;
    image?: string;
  };
}
