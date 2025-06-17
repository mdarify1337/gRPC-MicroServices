import { Injectable, Inject, BadRequestException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './product.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

interface AuthService 
{
    Validate(data: { id: string }): any;
}



@Injectable()
export class ProductService implements OnModuleInit {
    private authService: AuthService;
    constructor(
        @InjectRepository(Product) private readonly repo: Repository<Product>,
        @Inject('AUTHENTICATION_PACKAGE') private readonly client: ClientGrpc,
    ) {}
    
    onModuleInit() {
        this.authService = this.client.getService<AuthService>('AuthService');
    }

    async createProduct(dto: CreateProductDto): Promise<Product> {
        try {
            const user = await lastValueFrom(this.authService.Validate({ id: dto.userId }));
            if (!user ) {
                throw new BadRequestException('Invalid user ID');
            }
        } catch (error) {
            throw new BadRequestException('User not found or validation failed');
        }
        const product = this.repo.create(dto);
        return this.repo.save(product);
    }

    async getProductsByUser(userId: string): Promise<Product[]> {
        return this.repo.find({ 
                where: { userId } 
            }
        );
    }
}
