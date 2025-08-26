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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const create_auth_dto_1 = require("./dto/create-auth.dto");
const login_auth_dto_1 = require("./dto/login-auth.dto");
const create_url_dto_1 = require("./dto/create-url.dto");
const common_2 = require("@nestjs/common");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async create(createAuthDto) {
        return await this.authService.create(createAuthDto);
    }
    async signIn(loginAuthDto) {
        return await this.authService.signIn(loginAuthDto);
    }
    async createUrl(createUrlDto) {
        return await this.authService.createUrl(createUrlDto);
    }
    async getUserUrls(authHeader) {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error('No Bearer token found');
        }
        const token = authHeader.split(' ')[1];
        return await this.authService.getUserUrls(token);
    }
    async getUrlData(id) {
        try {
            return await this.authService.getUrlData(id);
        }
        catch (error) {
            throw new common_2.InternalServerErrorException('Failed to retrieve URL data');
        }
    }
    async deleteOne(url, authHeader) {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error('No Bearer token found');
        }
        const token = authHeader.split(' ')[1];
        try {
            return await this.authService.deleteUrl(url, token);
        }
        catch (error) {
            throw new common_2.InternalServerErrorException('Failed to delete URL');
        }
    }
    async deleteAll(authHeader) {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error('No Bearer token found');
        }
        const token = authHeader.split(' ')[1];
        return await this.authService.deleteAllUrls(token);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('signUp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.CreateAuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_auth_dto_1.LoginAuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)("createUrl"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_url_dto_1.CreateUrlDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createUrl", null);
__decorate([
    (0, common_1.Get)('/main/history'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUserUrls", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getUrlData", null);
__decorate([
    (0, common_1.Delete)(':url'),
    __param(0, (0, common_1.Param)('url')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteOne", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteAll", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map