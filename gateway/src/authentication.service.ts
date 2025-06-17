import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface AuthService {
  Register(data: { email: string; password: string; username: string }): Observable<any>;
}

@Injectable()
export class AuthGatewayService implements OnModuleInit {
  private authService: AuthService;

  constructor(@Inject('AUTHENTICATION_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthService>('AuthService');
  }

  registerUser(email: string, password: string, username: string) {
    console.log('Registering user from gateway ==> :', this.authService.Register({ email, password, username }));
    return this.authService.Register({ email, password, username });
  }
}
