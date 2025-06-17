import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from '../user/user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @GrpcMethod('AuthService', 'Register')
    async register(data: { email: string; password: string; username: string }) {
        const user = await this.userService.createUser(data);
        return { id: user.id, email: user.email, username: user.username };
    }

    @GrpcMethod('AuthService', 'ValidateUser')
    async validateUser(data: { email: string; password: string; username: string }) {
        const user = await this.userService.validateUser(data.email, data.password);
        if (!user) throw new Error('Invalid credentials');
        return { id: user.id, email: user.email, username: user.username };
    }
}

