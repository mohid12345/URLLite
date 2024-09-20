import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/Login-auth.dto';
import { User } from './schemas/userSchema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Url } from './schemas/urlSchema';
import { CreateUrlDto } from './dto/create-url.dto';
import * as shortid from 'shortid';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private jwtService: JwtService,
    @InjectModel(Url.name) private UrlModel: Model<Url>,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const { email, password, username } = createAuthDto;

    // email is unique
    const emailExeed = await this.UserModel.findOne({ email: email });

    if (emailExeed) {
      // throw new NotFoundException('Email already in use');
      throw new ConflictException('Email already in use');
    }

    // password hasing
    const hashedpassword = await bcrypt.hash(password, 10);

    // save

    await this.UserModel.create({
      username,
      email,
      password: hashedpassword,
    });

    return {
      message: 'user created sucessfully',
    };
  }

  async signIn(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    const data = await this.UserModel.findOne({ email: email });

    if (!data) {
      return new UnauthorizedException('Email is not valid');
    }

    if (!(await bcrypt.compare(password, data.password))) {
      return new UnauthorizedException('Password is not match');
    }

    const payload = { userData: data };
    return {
      message: 'sucessfully login',
      Access_Token: await this.jwtService.sign(payload),
    };
  }

  async createUrl(createUrlDto: CreateUrlDto) {
    console.log(createUrlDto);

     const {url}=createUrlDto
    // Check if the long URL already exists 
    let exedUrl = await this.UrlModel.findOne({longUrl:createUrlDto.url})
    if (exedUrl) {
      return {
        shortUrl:`http://localhost:5173/shortUr/${exedUrl.shortUrl}`
      } 
    }

    // create shortId  
    const shortId = shortid.generate();

    await this.UrlModel.create({
      longUrl:createUrlDto.url,
      shortUrl:shortId
    })

    // reutrn that shortUrl
     return {
       shortUrl:`http://localhost:5173/shortUrl/${shortId}`
     }
  }

 async getUrlData(id:string){
        try {
         const Url= await this.UrlModel.findOne({shortUrl:id})
         
         if(!Url){
          return new BadRequestException('This Id is not valid');
         }

         return Url.longUrl
        } catch (error) {
          
        } 
  }

}
