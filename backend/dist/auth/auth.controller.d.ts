import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateUrlDto } from './dto/create-url.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    getUserUrls(authHeader: string): Promise<import("./schemas/urlSchema").Url[]>;
    getUrlData(id: string): Promise<any>;
}
