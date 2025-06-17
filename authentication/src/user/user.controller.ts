import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Controller()
export class UserController {
    constructor(
        private readonly userService: UserService,
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ) { }

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

    @GrpcMethod('AuthService', 'Validate')
    async validate(data: { id: string }) {
        console.log('[AUTH] Validating user:', data); // Add this for debug

        const user = await this.userRepo.findOne({ where: { id: data.id } });

        if (!user) {
            throw new RpcException('User not found'); // ✅ Must use RpcException, not regular Error
        }

        return {
            id: user.id,
            email: user.email,
            username: user.username,
        };
    }

}

