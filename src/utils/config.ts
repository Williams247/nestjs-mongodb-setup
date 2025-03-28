import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

export class Config {
  constructor() {}

  static configEnv() {
    return ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    });
  }

  static configureJWT() {
    return JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: function (configService: ConfigService) {
        return {
          secret: configService.get<string>('SECRET'),
          signOptions: { expiresIn: '1h' },
        };
      },
    });
  }
}
