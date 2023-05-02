import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuardMock extends AuthGuard('jwt') {
  async canActivate() {
    return true;
  }
}
