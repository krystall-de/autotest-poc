import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppConfig } from '../config/config';
import { UserModule } from '../user/user.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<AppConfig>) => ({
        secret: configService.get('jwtSecret', { infer: true }),
        signOptions: {
          expiresIn: '15m',
          issuer: configService.get('systemName', { infer: true }), // API
          audience: configService.get('systemName', { infer: true }), // Frontend
          algorithm: 'HS256',
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    // Setup global guard with useExisting and provide AuthGuard explicitly to allow overriding in tests
    { provide: APP_GUARD, useExisting: AuthGuard },
    AuthGuard,
    AuthService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
