import { AuthenticationService } from 'authentication/authentication.service';
import { LoginUserDto } from 'authentication/dto/loginUser.dto';
import { RequestWithUser } from 'authentication/entities/requestWithUser.interface';
import { JwtAccessGuard } from 'authentication/guards/jwtAccess.guard';
import { JwtRefreshGuard } from 'authentication/guards/jwtRefresh.guard';
import { LocalAuthenticationGuard } from 'authentication/guards/localAuthentication.guard';
import { ApiRoute } from 'monotypes/ApiRoute.enum';
import { AuthenticationRoute } from 'monotypes/AuthenticationRoutes.enum';
import { CreateUserDto } from 'users/dto/createUser.dto';
import { UsersService } from 'users/users.service';

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

@Controller(ApiRoute.Authentication)
@ApiTags(ApiRoute.Authentication)
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
  ) {}

  @Post(AuthenticationRoute.Register)
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

  @Post(AuthenticationRoute.LogIn)
  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  async logIn(@Body() _: LoginUserDto, @Req() request: RequestWithUser) {
    const { user } = request;

    const refreshToken = this.authenticationService.getJwtRefreshToken(user.id);
    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

    const jwtCookies = this.authenticationService.getLoginCookies(user.id);
    request.res.setHeader('Set-Cookie', jwtCookies);
    return user;
  }

  @Post(AuthenticationRoute.LogOut)
  @HttpCode(200)
  @UseGuards(JwtAccessGuard)
  async logOut(@Req() request: RequestWithUser) {
    await this.usersService.removeRefreshToken(request.user.id);
    request.res.setHeader(
      'Set-Cookie',
      this.authenticationService.getLogoutCookies(),
    );
  }

  @Get('auth')
  @UseGuards(JwtAccessGuard)
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    return user;
  }

  @Get(AuthenticationRoute.Refresh)
  @UseGuards(JwtRefreshGuard)
  refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie =
      this.authenticationService.getJwtAccessTokenCookie(request.user.id);

    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }
}
