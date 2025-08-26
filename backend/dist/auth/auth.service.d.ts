import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUrlDto } from './dto/create-url.dto';
import { IUserRepository } from './repositories/interfaces/user.repository.interface';
import { IUrlRepository } from './repositories/interfaces/url.repository.interface';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly userRepository;
    private readonly urlRepository;
    private jwtService;
    private readonly configService;
    constructor(userRepository: IUserRepository, urlRepository: IUrlRepository, jwtService: JwtService, configService: ConfigService);
    create(createAuthDto: CreateAuthDto): Promise<{
        message: string;
    }>;
    signIn(loginAuthDto: LoginAuthDto): Promise<{
        message: string;
        userId: unknown;
        Access_Token: string;
    }>;
    createUrl(createUrlDto: CreateUrlDto): Promise<{
        shortUrl: string;
    }>;
    getUrlData(id: string): Promise<String>;
    getUserUrls(token: string): Promise<import("./schemas/urlSchema").Url[]>;
    deleteUrl(shortUrl: string, token: string): Promise<{
        message: string;
    }>;
    deleteAllUrls(token: string): Promise<{
        message: string;
    }>;
}
