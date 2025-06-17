import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
interface AuthService {
  Register(data: { email: string; password: string; username: string }): Observable<any>;
  Login(data: { email: string; password: string }): Observable<any>;
  Validate(data: { id: string }): Observable<{ id: string; email: string; username: string }>;
}



@Injectable()
export class AuthGatewayService implements OnModuleInit {
  private authService: AuthService;

  constructor(@Inject('AUTHENTICATION_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthService>('AuthService');
  }

  registerUser(email: string, password: string, username: string) {
    return this.authService.Register({ email, password, username });
  }

  validateUserById(id: string) {
    return this.authService.Validate({ id }); // ✅ This calls the Validate RPC
  }
}
