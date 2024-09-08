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
exports.UsersService = void 0;
const prisma_service_1 = require("./../prisma/prisma.service");
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
let UsersService = class UsersService {
    constructor(PrismaService) {
        this.PrismaService = PrismaService;
    }
    async create(createUserDto) {
        try {
            const newUser = await this.PrismaService.user.create({
                data: {
                    ...createUserDto,
                    Passwork_hash: await (0, bcrypt_1.hash)(createUserDto.Passwork_hash, 10),
                },
            });
            const { Passwork_hash, ...result } = newUser;
            return result;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code == 'P2002') {
                    throw new common_1.ConflictException(`username·o·email·ya·existe·${createUserDto.username}`);
                }
            }
            throw new common_1.InternalServerErrorException();
        }
        ;
    }
    findAll() {
        return this.PrismaService.user.findMany();
    }
    async findOne(id) {
        const User = await this.PrismaService.user.findUnique({
            where: {
                id: id
            }
        });
        if (!User) {
            throw new common_1.NotFoundException(`no se encontro el usuario con el id ${id} error`);
        }
        const { Passwork_hash, ...userWithoutPassword } = User;
        return userWithoutPassword;
    }
    async update(id, updateUserDto) {
        const UserUpdate = await this.PrismaService.user.update({
            where: {
                id
            },
            data: {
                ...updateUserDto,
                Passwork_hash: await (0, bcrypt_1.hash)(updateUserDto.Passwork_hash, 10),
            },
        });
        if (!UserUpdate) {
            throw new common_1.NotFoundException(`no se actualizo el usuario con el id ${id} error`);
        }
        return UserUpdate;
    }
    async remove(id) {
        const deleteUser = await this.PrismaService.user.delete({
            where: {
                id
            }
        });
        if (!deleteUser) {
            throw new common_1.NotFoundException(`no se encontro el usuario con el id ${id} error`);
        }
        return deleteUser;
    }
    async findByEmail(username) {
        return await this.PrismaService.user.findUnique({
            where: {
                username: username,
            },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map