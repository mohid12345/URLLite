import { User } from "src/auth/schemas/userSchema";
export declare const IUserRepositoryToken = "IUserRepository";
export interface IUserRepository {
    findByEmail(email: string): Promise<User>;
    findById(userId: string): Promise<User | null>;
    create(user: Partial<User>): Promise<User>;
    updateRefreshToken(userId: string, refreshToken: string | null): Promise<void>;
}
