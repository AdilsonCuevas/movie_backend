import { UsersService } from 'src/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor (private UsersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async login(dto:LoginDto) {
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

    async validateUser(dto:LoginDto) {
        const user = await this.UsersService.findByEmail(dto.username);
        
        if (user && (await compare(dto.passwork, user.Passwork_hash))) {
            const { Passwork_hash, ...result } = user;
            return result;
        }
        console.log("nada");
        throw new UnauthorizedException();
    }

    async refreshToken(user: any) {
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
}