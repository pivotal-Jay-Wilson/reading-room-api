import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleGuard implements CanActivate {
  private readonly logger = new Logger(GoogleGuard.name);
  private readonly CLIENT_ID = '102885278831-h8f29s7qqmqu1tdudstjn38u5vtr2mkc.apps.googleusercontent.com';
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.verify(request.headers.authorization).then(() => {
      return true;
    });
  }

  async verify(token) {
    try {
      const client = new OAuth2Client(this.CLIENT_ID);
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: this.CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const userid = payload['sub'];
    } catch (err) {
      this.logger.error(err);
    }
  }

}
