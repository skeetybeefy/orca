import { Strategy } from 'passport-local';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { User } from 'src/users/entities/user.entity';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    console.log({ email, password });
    return this.authenticationService.getAuthenticatedUser(email, password);
  }
}
