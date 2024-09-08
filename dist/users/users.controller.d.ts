import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        username: string;
        Lastname: string | null;
        Fistname: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        username: string;
        Lastname: string | null;
        Fistname: string;
        Passwork_hash: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        username: string;
        Lastname: string | null;
        Fistname: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: number;
        username: string;
        Lastname: string | null;
        Fistname: string;
        Passwork_hash: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
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
