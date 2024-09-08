import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';

@Injectable()
export class RefreshJwtGuard implements CanActivate {

    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) throw new UnauthorizedException();

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: '0h9Ljc5jZalrQSXqOGTtd5lhewyJrAeHmTlFNK4z6b8+wQQrsOL0b4oqK+eJk0XWUJL0mL0xJse+td8e7nWw0A==',
            });
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true
    }

    private extractTokenFromHeader(request: Request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Refresh' ? token : undefined;
      }
}