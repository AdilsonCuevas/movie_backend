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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const users_service_1 = require("../users/users.service");
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(UsersService, jwtService) {
        this.UsersService = UsersService;
        this.jwtService = jwtService;
    }
    async login(dto) {
        const user = await this.validateUser(dto);
        const payload = {
            username: user.email,
            sub: {
                Lastname: user.Lastname
            },
        };
        return {
            user,
            backendTokens: {
                accessToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '1h',
                    secret: '8rAAfvf0NV/QeucnoEI2Juj8f3lLt12ierdv9I/QAmi53tvMy3V16bDAB+8r4uFl/JZFE7vbFSVRprLEeEhtWg==',
                }),
                refreshToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '7h',
                    secret: '0h9Ljc5jZalrQSXqOGTtd5lhewyJrAeHmTlFNK4z6b8+wQQrsOL0b4oqK+eJk0XWUJL0mL0xJse+td8e7nWw0A==',
                })
            },
        };
    }
    async validateUser(dto) {
        const user = await this.UsersService.findByEmail(dto.username);
        if (user && (await (0, bcrypt_1.compare)(dto.passwork, user.Passwork_hash))) {
            const { Passwork_hash, ...result } = user;
            return result;
        }
        console.log("nada");
        throw new common_1.UnauthorizedException();
    }
    async refreshToken(user) {
        const payload = {
            username: user.username,
            sub: {
                Lastname: user.sub
            },
        };
        return {
            user,
            backendTokens: {
                accessToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '20s',
                    secret: '8rAAfvf0NV/QeucnoEI2Juj8f3lLt12ierdv9I/QAmi53tvMy3V16bDAB+8r4uFl/JZFE7vbFSVRprLEeEhtWg==',
                }),
                refreshToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '7h',
                    secret: '0h9Ljc5jZalrQSXqOGTtd5lhewyJrAeHmTlFNK4z6b8+wQQrsOL0b4oqK+eJk0XWUJL0mL0xJse+td8e7nWw0A==',
                })
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map