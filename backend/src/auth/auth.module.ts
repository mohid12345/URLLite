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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Url.name, schema: UrlSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
     //for defining custom providers using interfaces.
    //Bind interface to implementation
     { provide: IUserRepositoryToken , useClass: UserRepository},
     { provide: IUrlRepositoryToken, useClass: UrlRepository}
    ],
})
export class AuthModule {}
