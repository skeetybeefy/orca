import { AuthenticationService } from 'src/authentication/authentication.service';
import { JwtAccessGuard } from 'src/authentication/guards/jwtAccess.guard';
import { JwtRefreshGuard } from 'src/authentication/guards/jwtRefresh.guard';
import { LocalAuthenticationGuard } from 'src/authentication/guards/localAuthentication.guard';
import { RequestWithUser } from 'src/authentication/entities/requestWithUser.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('authentication')
@ApiTags('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(
    @Body() registrationData: CreateUserDto,
    @Req() request: RequestWithUser,
  ) {
    const user = await this.authenticationService.register(registrationData);

    const refreshToken = this.authenticationService.getJwtRefreshToken(user.id);
    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

    const jwtCookies = this.authenticationService.getLoginCookies(user.id);
    request.res.setHeader('Set-Cookie', jwtCookies);
    return user;
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;

    const refreshToken = this.authenticationService.getJwtRefreshToken(user.id);
    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

    const jwtCookies = this.authenticationService.getLoginCookies(user.id);
    request.res.setHeader('Set-Cookie', jwtCookies);
    return user;
  }

  @UseGuards(JwtAccessGuard)
  @Post('log-out')
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    await this.usersService.removeRefreshToken(request.user.id);
    request.res.setHeader(
      'Set-Cookie',
      this.authenticationService.getLogoutCookies(),
    );
  }

  @UseGuards(JwtAccessGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie =
      this.authenticationService.getJwtAccessTokenCookie(request.user.id);

    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }
}
