import { Body, Controller, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // авторизация пользователя (получение jwt)
    @Post('login')
    @ApiOperation({ summary: "login user" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success" })
    async login(@Body() authDto: AuthUserDto) {
        return this.authService.login(authDto);
    }

    // повторная авторизация пользователя (получение jwt)
    @UseGuards(JwtAuthGuard)
    @Post('refresh')
    @ApiOperation({ summary: "refresh user" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success" })
    async refresh(@Request() req: any) {
        console.log(req.user)
        return this.authService.refresh(req.user);
    }

    // регистрация пользователя
    @Post('registration')
    @ApiOperation({ summary: "registration user" })
    @ApiResponse({ status: HttpStatus.OK, description: "Success" })
    async registration(@Body() authDto: AuthUserDto) {
        return this.authService.registration(authDto);
    }
}
