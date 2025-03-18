import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { User } from './schemas/userSchema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Url } from './schemas/urlSchema';
import { CreateUrlDto } from './dto/create-url.dto';
import * as jwt from 'jsonwebtoken';
import * as shortid from 'shortid';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private jwtService: JwtService,
    @InjectModel(Url.name) private UrlModel: Model<Url>,
  ) { }

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
      throw new UnauthorizedException('Email is not valid');
    }

    if (!(await bcrypt.compare(password, data.password))) {
      throw new UnauthorizedException('Password does not match');
    }

    const payload = { userId: data._id }; // Ensure _id is available in your DB schema

    return {
      message: 'Successfully logged in',
      userId: data._id, // Send userId in the response
      Access_Token: await this.jwtService.sign(payload),
    };
  }


  async createUrl(createUrlDto: CreateUrlDto,) {
    const { url, userId } = createUrlDto;
    try {
      // Check if the long URL already exists
      let exedUrl = await this.UrlModel.findOne({ longUrl: url });
      if (exedUrl) {
        return {
          shortUrl: `http://localhost:5173/shortUrl/${exedUrl.shortUrl}`
        };
      }

      // Create shortId  
      const shortId = shortid.generate();

      await this.UrlModel.create({
        longUrl: createUrlDto.url,
        shortUrl: shortId,
        userId: userId
      });

      // Return the shortUrl
      return {
        shortUrl: `http://localhost:5173/shortUrl/${shortId}`
      };
    } catch (error) {
      console.error('Token verification failed:', error);
      throw new Error('Invalid or expired token');
    }
  }

  // async getUrlData(id: string) {
  //   try {
  //     const Url = await this.UrlModel.findOne({ shortUrl: id })

  //     if (!Url) {
  //       return new BadRequestException('This Id is not validz');
  //     }

  //     return Url.longUrl
  //   } catch (error) {

  //   }
  // }

  async getUrlData(id: string) {
    try {
      const url = await this.UrlModel.findOne({ shortUrl: id });
  
      if (!url) {
        throw new BadRequestException('This Id is not valid'); // ❌ You were returning instead of throwing
      }
  
      return url.longUrl;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching URL data'); // Handle errors properly
    }
  }
  


  //for get user url history
  // async getUserUrls(token: string) {
  //   try {
  //     // Extract userId from token
  //     const decodedToken = this.jwtService.verify(token);
  //     const userId = decodedToken.userId;
  //     console.log("decoded userId", userId);

  //     if (!userId) {
  //       throw new UnauthorizedException('Invalid token');
  //     }

  //     // Fetch URLs using userId
  //     const urls = await this.UrlModel.find({ userId }).select('-_id longUrl shortUrl clickCount createdAt');

  //     if (!urls.length) {
  //       throw new NotFoundException('No shortened URLs found for this user.');
  //     }

  //     return urls;
  //   } catch (error) {
  //     throw new UnauthorizedException('Invalid or expired token');
  //   }
  // }

  async getUserUrls(token: string) {
    try {
      // Verify and decode token
      const decodedToken = this.jwtService.verify(token);
      const userId = decodedToken.userId;
  
      if (!userId) {
        throw new UnauthorizedException('Invalid token');
      }
  
      // Fetch URLs using userId
      const urls = await this.UrlModel.find({ userId }).select('-_id longUrl shortUrl clickCount createdAt');
  
      if (!urls || urls.length === 0) {
        throw new NotFoundException('No shortened URLs found for this user.');
      }
  
      return urls;
    } catch (error) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Invalid or expired token');
      }
  
      throw new InternalServerErrorException('Failed to fetch user URLs');
    }
  }
  



}
