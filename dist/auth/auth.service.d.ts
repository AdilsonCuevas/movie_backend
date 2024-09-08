import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private UsersService;
    private jwtService;
    constructor(UsersService: UsersService, jwtService: JwtService);
    login(dto: LoginDto): Promise<{
        user: {
            id: number;
            username: string;
            Lastname: string | null;
            Fistname: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
        };
        backendTokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    validateUser(dto: LoginDto): Promise<{
        id: number;
        username: string;
        Lastname: string | null;
        Fistname: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    refreshToken(user: any): Promise<{
        user: any;
        backendTokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
}
