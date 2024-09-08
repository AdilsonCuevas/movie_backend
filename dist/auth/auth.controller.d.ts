import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
    refreshToken(req: any): Promise<{
        user: any;
        backendTokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
}
