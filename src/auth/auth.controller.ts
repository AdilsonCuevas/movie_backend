import { AuthService } from './auth.service';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/auth.dto';
import { RefreshJwtGuard } from './guards/refresh.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor (private authService: AuthService) {}

    @Post('login')
    @ApiOperation({summary: 'Iniciar sesion'})
    async login(@Body() dto: LoginDto) {
        return await this.authService.login(dto);
    }

    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    @ApiOperation({summary: 'Refrescar el token'})
    async refreshToken(@Request() req) {
        return await this.authService.refreshToken(req);
    }
}
