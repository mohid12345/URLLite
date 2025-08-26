"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const shortid = require("shortid");
const user_repository_interface_1 = require("./repositories/interfaces/user.repository.interface");
const url_repository_interface_1 = require("./repositories/interfaces/url.repository.interface");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(userRepository, urlRepository, jwtService, configService) {
        this.userRepository = userRepository;
        this.urlRepository = urlRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async create(createAuthDto) {
        const { email, password, username } = createAuthDto;
        const emailExist = await this.userRepository.findByEmail(email);
        if (emailExist) {
            throw new common_1.ConflictException('Email already in use');
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        await this.userRepository.create({
            username,
            email,
            password: hashedpassword,
        });
        return {
            message: 'user created sucessfully',
        };
    }
    async signIn(loginAuthDto) {
        const { email, password } = loginAuthDto;
        const existEmail = await this.userRepository.findByEmail(email);
        if (!existEmail) {
            throw new common_1.UnauthorizedException('Email is not valid');
        }
        if (!(await bcrypt.compare(password, existEmail.password))) {
            throw new common_1.UnauthorizedException('Password does not match');
        }
        const payload = { userId: existEmail._id };
        return {
            message: 'Successfully logged in',
            userId: existEmail._id,
            Access_Token: await this.jwtService.sign(payload),
        };
    }
    async createUrl(createUrlDto) {
        const { url, userId } = createUrlDto;
        try {
            let exedUrl = await this.urlRepository.findByUrl(url);
            const baseUrl = this.configService.get('LOCAL_URL');
            if (exedUrl) {
                return {
                    shortUrl: `${exedUrl.shortUrl}`
                };
            }
            const shortId = shortid.generate();
            await this.urlRepository.create({
                longUrl: createUrlDto.url,
                shortUrl: shortId,
                userId: userId
            });
            return {
                shortUrl: `${shortId}`
            };
        }
        catch (error) {
            console.error('Token verification failed:', error);
            throw new Error('Invalid or expired token');
        }
    }
    async getUrlData(id) {
        try {
            const url = await this.urlRepository.findLongUrlFromShort(id);
            if (!url) {
                throw new common_1.BadRequestException('This Id is not valid');
            }
            return url.longUrl;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error fetching URL data');
        }
    }
    async getUserUrls(token) {
        try {
            const decodedToken = this.jwtService.verify(token);
            const userId = decodedToken.userId;
            if (!userId) {
                throw new common_1.UnauthorizedException('Invalid token');
            }
            const urls = await this.urlRepository.findByUserId(userId);
            console.log("all urls ::", urls);
            if (!urls || urls.length === 0) {
                throw new common_1.NotFoundException('No shortened URLs found for this user.');
            }
            return urls;
        }
        catch (error) {
            if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
                throw new common_1.UnauthorizedException('Invalid or expired token');
            }
            if (error instanceof common_1.NotFoundException || error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to fetch user URLs');
        }
    }
    async deleteUrl(shortUrl, token) {
        try {
            const decodedToken = this.jwtService.verify(token);
            const userId = decodedToken.userId;
            const rmResult = await this.urlRepository.deleteByShortUrl(shortUrl);
            if (rmResult.deletedCount && rmResult.deletedCount > 0) {
                return { message: 'URL deleted successfully' };
            }
            else {
                return { message: 'URL delete unsuccessfull' };
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to delete URL');
        }
    }
    async deleteAllUrls(token) {
        try {
            const decodedToken = this.jwtService.verify(token);
            const userId = decodedToken.userId;
            await this.urlRepository.deleteAllByUserId(userId);
            return { message: 'All URLs deleted successfully' };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to delete all URLs');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(user_repository_interface_1.IUserRepositoryToken)),
    __param(1, (0, common_1.Inject)(url_repository_interface_1.IUrlRepositoryToken)),
    __metadata("design:paramtypes", [Object, Object, jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map