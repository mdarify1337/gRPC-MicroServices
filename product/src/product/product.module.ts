import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        ClientsModule.register([
            {
                name: 'AUTHENTICATION_PACKAGE',
                transport: Transport.GRPC,
                options: {
                    package: 'authentication',
                    protoPath: join(__dirname, '../../proto/authentication.proto'),
                    url: 'authentication:3002', 
                },
            },
        ])
    ],
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule { }
