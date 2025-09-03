// token.module.ts
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'ACCESS_TOKEN_SERVICE',
      useFactory: (configService: ConfigService) => {
        return new JwtService({
          secret: configService.get<string>('JWT_Access_SecretKey'),
          signOptions: { expiresIn: '15m' },
        });
      },
      inject: [ConfigService],
    },
    {
      provide: 'REFRESH_TOKEN_SERVICE',
      useFactory: (configService: ConfigService) => {
        return new JwtService({
          secret: configService.get<string>('JWT_Refresh_SecretKey'),
          signOptions: { expiresIn: '7d' },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['ACCESS_TOKEN_SERVICE', 'REFRESH_TOKEN_SERVICE'],
})
export class TokenModule {}
