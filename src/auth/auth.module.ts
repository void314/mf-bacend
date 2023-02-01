import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  providers: [ AuthService, JwtStrategy ],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.RIVATE_KEY || 'SECRET',
      signOptions: { expiresIn: '120s' },
    }),
  ],
  exports: [ AuthService ],
  controllers: [AuthController]
})
export class AuthModule {}
