import { User } from "src/auth/schemas/userSchema";
export declare const IUserRepositoryToken = "IUserRepository";
export interface IUserRepository {
    findByEmail(email: string): Promise<User>;
    create(user: Partial<User>): Promise<User>;
}
