import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/userSchema';
import { Url, UrlSchema } from './schemas/urlSchema';

@Module({
  imports:[MongooseModule.forFeature([
     {
      name:User.name,
      schema:UserSchema
     },{
      name:Url.name,
      schema:UrlSchema
     }
  ])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
