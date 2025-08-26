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
exports.UrlRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const urlSchema_1 = require("../schemas/urlSchema");
let UrlRepository = class UrlRepository {
    constructor(urlModel) {
        this.urlModel = urlModel;
    }
    async create(url) {
        const newUrl = new this.urlModel(url);
        return newUrl.save();
    }
    async findByUrl(longUrl) {
        return this.urlModel.findOne({ longUrl }).exec();
    }
    async findLongUrlFromShort(shortUrl) {
        console.log("my string ::", shortUrl);
        const urlDoc = await this.urlModel.findOneAndUpdate({ shortUrl }, { $inc: { count: 1 } }, { new: true }).exec();
        return urlDoc;
    }
    async findByUserId(userId) {
        return this.urlModel.find({ userId }).exec();
    }
    async deleteByShortUrl(shortUrl) {
        return await this.urlModel.deleteOne({ shortUrl }).exec();
    }
    async deleteAllByUserId(userId) {
        await this.urlModel.deleteMany({ userId }).exec();
    }
};
exports.UrlRepository = UrlRepository;
exports.UrlRepository = UrlRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(urlSchema_1.Url.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UrlRepository);
//# sourceMappingURL=url.repository.js.map