import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './passport-strategies/local.strategy';
import { JwtStrategy } from './passport-strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { MailerModule } from 'app/mailer/mailer.module';
import { EConfigKeys } from 'common/constants';
import { Room } from 'app/chat/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Room]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>(EConfigKeys.JWT_SECRET),
        signOptions: {
          expiresIn: configService.get<string>(EConfigKeys.JWT_EXPIRES_IN),
        },
      }),
    }),
    MailerModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
