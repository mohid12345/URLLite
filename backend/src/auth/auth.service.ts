import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUrlDto } from './dto/create-url.dto';
import * as shortid from 'shortid';
import { IUserRepository, IUserRepositoryToken } from './repositories/interfaces/user.repository.interface';
import { IUrlRepository, IUrlRepositoryToken } from './repositories/interfaces/url.repository.interface';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class AuthService {
  constructor(
    @Inject(IUserRepositoryToken) private readonly userRepository: IUserRepository,
    @Inject(IUrlRepositoryToken) private readonly urlRepository: IUrlRepository,
    private jwtService: JwtService,
    private readonly configService: ConfigService, //for importing env file 
  ) { }

  async create(createAuthDto: CreateAuthDto) {
    const { email, password, username } = createAuthDto;
    const emailExist = await this.userRepository.findByEmail(email);
    if (emailExist) {
      throw new ConflictException('Email already in use');
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    await this.userRepository.create({
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
    const existEmail = await this.userRepository.findByEmail(email);

    if (!existEmail) {
      throw new UnauthorizedException('Email is not valid');
    }

    if (!(await bcrypt.compare(password, existEmail.password))) {
      throw new UnauthorizedException('Password does not match');
    }

    const payload = { userId: existEmail._id }; // Ensure _id is available in your DB schema

    return {
      message: 'Successfully logged in',
      userId: existEmail._id, // Send userId in the response
      Access_Token: await this.jwtService.sign(payload),
    };
  }


  async createUrl(createUrlDto: CreateUrlDto,) {
    const { url, userId } = createUrlDto;
    try {
      // Check if the long URL already exists
      let exedUrl = await this.urlRepository.findByUrl(url);
      const baseUrl = this.configService.get<string>('LOCAL_URL')
      if (exedUrl) {
        return {
          // shortUrl: `${baseUrl}${exedUrl.shortUrl}`
          shortUrl: `${exedUrl.shortUrl}`
        };
      }

      // Create shortId  
      const shortId = shortid.generate();

      await this.urlRepository.create({
        longUrl: createUrlDto.url,
        shortUrl: shortId,
        userId: userId
      });

      // Return the shortUrl
      return {
        // shortUrl: `${baseUrl}${shortId}`
        shortUrl: `${shortId}`
      };
    } catch (error) {
      console.error('Token verification failed:', error);
      throw new Error('Invalid or expired token');
    }
  }


  async getUrlData(id: string) {
    try {
      const url = await this.urlRepository.findLongUrlFromShort(id);

      if (!url) {
        throw new BadRequestException('This Id is not valid'); // ❌ You were returning instead of throwing
      }

      return url.longUrl;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching URL data'); // Handle errors properly
    }
  }

  // get history 
  async getUserUrls(token: string) {
    try {
      const decodedToken = this.jwtService.verify(token);
      const userId = decodedToken.userId;

      if (!userId) {
        throw new UnauthorizedException('Invalid token');
      }

      const urls = await this.urlRepository.findByUserId(userId);
      console.log("all urls ::", urls);

      if (!urls || urls.length === 0) {
        throw new NotFoundException('No shortened URLs found for this user.');
      }

      return urls;
    } catch (error) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Invalid or expired token');
      }

      // ✅ rethrow if it's already a Nest exception
      if (error instanceof NotFoundException || error instanceof UnauthorizedException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to fetch user URLs');
    }
  }


  async deleteUrl(shortUrl: string, token: string) {
    try {
      const decodedToken = this.jwtService.verify(token);
      const userId = decodedToken.userId;

      // Find the URL and ensure it belongs to the user
      // const url = await this.urlRepository.findLongUrlFromShort(shortUrl);
      // if (!url || url.userId !== userId) {
      //   throw new UnauthorizedException('URL not found or unauthorized');
      // }

      const rmResult = await this.urlRepository.deleteByShortUrl(shortUrl);
      if (rmResult.deletedCount && rmResult.deletedCount > 0) {
        return { message: 'URL deleted successfully' };
      } else {
        return { message: 'URL delete unsuccessfull' }
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete URL');
    }
  }

  async deleteAllUrls(token: string) {
    try {
      const decodedToken = this.jwtService.verify(token);
      const userId = decodedToken.userId;
      await this.urlRepository.deleteAllByUserId(userId);
      return { message: 'All URLs deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete all URLs');
    }
  }



}
