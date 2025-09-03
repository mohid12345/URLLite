import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateUrlDto } from './dto/create-url.dto';
import { Request, Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(createAuthDto: CreateAuthDto): Promise<{
        message: string;
    }>;
    signIn(loginAuthDto: LoginAuthDto, res: Response): Promise<{
        message: string;
        userId: string;
        accessToken: string;
    }>;
    refresh(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    createUrl(createUrlDto: CreateUrlDto): Promise<{
        shortUrl: string;
    }>;
    getUserUrls(authHeader: string): Promise<import("./schemas/urlSchema").Url[]>;
    getUrlData(id: string): Promise<any>;
    deleteOne(url: string, authHeader: string): Promise<any>;
    deleteAll(authHeader: string): Promise<any>;
}
