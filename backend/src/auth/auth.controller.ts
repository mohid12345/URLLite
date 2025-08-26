import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateUrlDto } from './dto/create-url.dto';
import {
  InternalServerErrorException,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signUp')
  async create(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.create(createAuthDto);
  }


  @Post('login')
  async signIn(@Body() loginAuthDto: LoginAuthDto) {
    return await this.authService.signIn(loginAuthDto);
  }

  @Post("createUrl")
  async createUrl(
    @Body() createUrlDto: CreateUrlDto) {
    return await this.authService.createUrl(createUrlDto);
  }
  //for get url histroy of user
  @Get('/main/history')
  async getUserUrls(
    @Headers('authorization') authHeader: string
  ) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('No Bearer token found');
    }
    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    return await this.authService.getUserUrls(token); // Pass the token to the service if needed
  }


  @Get(':id')
  async getUrlData(@Param('id') id: string): Promise<any> {
    try {
      return await this.authService.getUrlData(id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve URL data');
    }
  }

  @Delete(':url')
  async deleteOne(
    @Param('url') url: string,
    @Headers('authorization') authHeader: string
  ): Promise<any> {
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('No Bearer token found');
    }
    const token = authHeader.split(' ')[1];
    try {
      return await this.authService.deleteUrl(url, token);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete URL');
    }
  }

  @Delete()
  async deleteAll(
    @Headers('authorization') authHeader: string
  ): Promise<any> {
if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('No Bearer token found');
    }
    const token = authHeader.split(' ')[1];
    return await this.authService.deleteAllUrls(token);
  }
}

