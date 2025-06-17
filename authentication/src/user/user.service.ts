import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private userRepo: Repository<User>) 
    { }

    async createUser(dto: CreateUserDto): Promise<User> {
        const hashed = await bcrypt.hash(dto.password, 10);
        const user = this.userRepo.create({ ...dto, password: hashed });
        console.log('Creating user in authentication service ==> :', user);
        return this.userRepo.save(user);
    }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userRepo.findOne({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }
}
