import { Model } from 'mongoose';
import { User } from '../schemas/userSchema';
import { IUserRepository } from './interfaces/user.repository.interface';
export declare class UserRepository implements IUserRepository {
    private readonly userModel;
    constructor(userModel: Model<User>);
    findByEmail(email: string): Promise<User | null>;
    findById(userId: string): Promise<User | null>;
    create(user: Partial<User>): Promise<User>;
    updateRefreshToken(userId: string, refreshToken: string | null): Promise<void>;
}
