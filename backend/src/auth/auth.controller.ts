import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateUrlDto } from './dto/create-url.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  async create(@Body() createAuthDto: CreateAuthDto) {
     return await this.authService.create(createAuthDto);
  }
  

  @Post('login')
  async signIn(@Body() loginAuthDto: LoginAuthDto) {
    return await this.authService.signIn(loginAuthDto);
  }

  @Post("createUrl")
  async createUrl(@Body() createUrlDto:CreateUrlDto ){
    return await this.authService.createUrl(createUrlDto)
  }

  @Get(':id')
  async getUrlData(@Param('id') id: string): Promise<any> {
    return await this.authService.getUrlData(id)
  }

  // @Get('')


}
