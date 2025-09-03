import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/userSchema';
import { Url, UrlSchema } from './schemas/urlSchema';
import { UserRepository } from './repositories/user.repository';
import { UrlRepository } from './repositories/url.repository';
import { IUserRepositoryToken } from './repositories/interfaces/user.repository.interface';
import { IUrlRepositoryToken } from './repositories/interfaces/url.repository.interface';
import { TokenModule } from '../token/token.module'; 


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Url.name, schema: UrlSchema },
    ]),
    TokenModule,  // brings in ACCESS_TOKEN_SERVICE + REFRESH_TOKEN_SERVICE
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: IUserRepositoryToken, useClass: UserRepository },
    { provide: IUrlRepositoryToken, useClass: UrlRepository },
  ],
  exports: [AuthService],
})
export class AuthModule {}
