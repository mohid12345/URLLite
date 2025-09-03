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
    @Inject('ACCESS_TOKEN_SERVICE') private readonly accessTokenService: JwtService,
    @Inject('REFRESH_TOKEN_SERVICE') private readonly refreshTokenService: JwtService,
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

    if (!existEmail) throw new UnauthorizedException('Email is not valid');

    const isPasswordValid = await bcrypt.compare(password, existEmail.password);
    if (!isPasswordValid) throw new UnauthorizedException('Password does not match');

    const payload = { userId: existEmail._id };

    const accessToken = await this.accessTokenService.signAsync(payload);
    const refreshToken = await this.refreshTokenService.signAsync(payload);

    // hash + store refresh token
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.updateRefreshToken(existEmail._id, hashedRefreshToken);

    return { userId: existEmail._id, accessToken, refreshToken };
  }




  async refreshTokens(refreshToken: string) {
    try {
      // verify refresh token 
      const payload = await this.refreshTokenService.verifyAsync(refreshToken);
      const userId = payload.userId;

      const user = await this.userRepository.findById(userId);
      if (!user || !user.refreshToken) {
        throw new UnauthorizedException('Access Denied');
      }

      // compare provided refresh token with hashed one in DB
      const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
      if (!isValid) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // issue new tokens
      const newPayload = { userId: user._id };
      const newAccessToken = await this.accessTokenService.signAsync(newPayload);
      const newRefreshToken = await this.refreshTokenService.signAsync(newPayload);

      // save new hashed refresh token in DB
      const hashedRefreshToken = await bcrypt.hash(newRefreshToken, 10);
      await this.userRepository.updateRefreshToken(user._id, hashedRefreshToken);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }



  async logout(userId: string) {
    return this.userRepository.updateRefreshToken(userId, null);
  }





  async createUrl(createUrlDto: CreateUrlDto,) {
    const { url, userId } = createUrlDto;
    try {
      // Check if the long URL already exists
      let exedUrl = await this.urlRepository.findByUrl(url);
      if (exedUrl) {
        return {
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
        throw new BadRequestException('This Id is not valid');
      }

      return url.longUrl;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching URL data');
    }
  }

  // get history 
  async getUserUrls(token: string) {
    try {
      const decodedToken = await this.accessTokenService.verifyAsync(token);
      const userId = decodedToken.userId;

      if (!userId) {
        throw new UnauthorizedException('Invalid token');
      }

      const urls = await this.urlRepository.findByUserId(userId);

      if (!urls || urls.length === 0) {
        // throw new NotFoundException('No shortened URLs found for this user.');
        return []
      }

      return urls;
    } catch (error) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Invalid or expired token');
      }

      if (error instanceof NotFoundException || error instanceof UnauthorizedException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to fetch user URLs');
    }
  }


  async deleteUrl(shortUrl: string, token: string) {
    try {
      const decodedToken = await this.accessTokenService.verifyAsync(token);

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
      const decodedToken = await this.accessTokenService.verifyAsync(token);
      const userId = decodedToken.userId;
      await this.urlRepository.deleteAllByUserId(userId);
      return { message: 'All URLs deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete all URLs');
    }
  }



}
