import { Controller, Get, Post, Body, Res, Req, Patch, Param, Delete, UseGuards, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateUrlDto } from './dto/create-url.dto';
import { Request, Response } from 'express';


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
  async signIn(
    @Body() loginAuthDto: LoginAuthDto,
    @Res({ passthrough: true }) res: Response
  ) {
    // Service returns { accessToken, refreshToken }
    const { accessToken, refreshToken, userId } =
      await this.authService.signIn(loginAuthDto);

    // Set refresh token as httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send only accessToken + userId back in response body
    return {
      message: 'Successfully logged in',
      userId,
      accessToken,
    };
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    // get refresh token from cookie

    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }

    const tokens = await this.authService.refreshTokens(refreshToken);

    // re-set the cookie with new refresh token
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    // send only access token in body
    return res.json({ accessToken: tokens.accessToken });
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

