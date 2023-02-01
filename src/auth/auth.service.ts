import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthUserDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs'
import { JwtStrategy } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) {}

    // Проверка есть ли пользователь в БД (авторизован ли он)
    // Если есть формирует payload
    private async validateUser(authDto: AuthUserDto) {
        const candidate = await this.usersService.getOneByPhone(authDto.phone); // TODO: реализовать вариативную авторизацию
        const passwordEquals = await bcrypt.compare(authDto.password, candidate.password)

        if (candidate && passwordEquals ) {
          return { nickname: candidate.login, sub: candidate.id, roles: candidate.roles};
        }
    }

    // Метод для повторной авторизации и формирования jwt
    async refresh(payload: string) {
        return { access_token: this.jwtService.sign(payload) };
    }

    // Метод для авторизации и формирования jwt
    async login(authDto: AuthUserDto) { 
        const payload = await this.validateUser(authDto);
        if (payload) {
            return {
                access_token: this.jwtService.sign(payload),
                refresh_token: this.jwtService.sign(payload, {expiresIn: '3d'})
            };
        }
        throw new HttpException('User not in database', HttpStatus.BAD_REQUEST)
    }

    // Метод для регистрации
    async registration(authDto: AuthUserDto) { 
        return await this.usersService.create(authDto);
    }
}
