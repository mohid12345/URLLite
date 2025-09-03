"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const mongoose_1 = require("@nestjs/mongoose");
const userSchema_1 = require("./schemas/userSchema");
const urlSchema_1 = require("./schemas/urlSchema");
const user_repository_1 = require("./repositories/user.repository");
const url_repository_1 = require("./repositories/url.repository");
const user_repository_interface_1 = require("./repositories/interfaces/user.repository.interface");
const url_repository_interface_1 = require("./repositories/interfaces/url.repository.interface");
const token_module_1 = require("../token/token.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: userSchema_1.User.name, schema: userSchema_1.UserSchema },
                { name: urlSchema_1.Url.name, schema: urlSchema_1.UrlSchema },
            ]),
            token_module_1.TokenModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            { provide: user_repository_interface_1.IUserRepositoryToken, useClass: user_repository_1.UserRepository },
            { provide: url_repository_interface_1.IUrlRepositoryToken, useClass: url_repository_1.UrlRepository },
        ],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map