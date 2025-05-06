import { User } from "src/auth/schemas/userSchema";


export const IUserRepositoryToken = 'IUserRepository';

export interface IUserRepository {
    findByEmail(email: string): Promise<User>;
    create(user: Partial<User>): Promise<User>;
}