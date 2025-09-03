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
    private readonly accessTokenService;
    private readonly refreshTokenService;
    private readonly configService;
    constructor(userRepository: IUserRepository, urlRepository: IUrlRepository, accessTokenService: JwtService, refreshTokenService: JwtService, configService: ConfigService);
    create(createAuthDto: CreateAuthDto): Promise<{
        message: string;
    }>;
    signIn(loginAuthDto: LoginAuthDto): Promise<{
        userId: string;
        accessToken: string;
        refreshToken: string;
    }>;
    refreshTokens(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: string): Promise<void>;
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
