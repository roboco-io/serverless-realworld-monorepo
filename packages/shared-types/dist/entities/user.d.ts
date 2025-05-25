/**
 * User entity interface
 * Represents a user in the system
 */
export interface User {
    id: string;
    email: string;
    username: string;
    bio?: string;
    image?: string;
    token?: string;
}
/**
 * User creation parameters
 */
export interface UserCreationParams {
    username: string;
    email: string;
    password: string;
}
/**
 * User login parameters
 */
export interface UserLoginParams {
    email: string;
    password: string;
}
/**
 * User update parameters
 */
export interface UserUpdateParams {
    email?: string;
    username?: string;
    password?: string;
    bio?: string;
    image?: string;
}
//# sourceMappingURL=user.d.ts.map