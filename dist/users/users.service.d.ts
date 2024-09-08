import { PrismaService } from './../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
export declare class UsersService {
    private PrismaService;
    constructor(PrismaService: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        username: string;
        Lastname: string | null;
        Fistname: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Prisma.PrismaPromise<{
        id: number;
        username: string;
        Lastname: string | null;
        Fistname: string;
        Passwork_hash: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        username: string;
        Lastname: string | null;
        Fistname: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        id: number;
        username: string;
        Lastname: string | null;
        Fistname: string;
        Passwork_hash: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        username: string;
        Lastname: string | null;
        Fistname: string;
        Passwork_hash: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByEmail(username: string): Promise<{
        id: number;
        username: string;
        Lastname: string | null;
        Fistname: string;
        Passwork_hash: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
