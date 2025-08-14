"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MorganLoggerService = void 0;
const common_1 = require("@nestjs/common");
const morgan = require("morgan");
let MorganLoggerService = class MorganLoggerService {
    constructor() {
        this.logger = morgan('combined');
    }
    log(message) {
        console.log(message);
    }
    error(message, trace) {
        console.error(message, trace);
    }
    warn(message) {
        console.warn(message);
    }
    debug(message) {
        console.debug(message);
    }
    verbose(message) {
        console.log(message);
    }
    getLogger() {
        return this.logger;
    }
};
exports.MorganLoggerService = MorganLoggerService;
exports.MorganLoggerService = MorganLoggerService = __decorate([
    (0, common_1.Injectable)()
], MorganLoggerService);
//# sourceMappingURL=logger.js.map