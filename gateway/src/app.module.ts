import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthGatewayService } from './authentication.service';
import { ProductGatewayService } from './product.service';
import { AppController } from './app.controller';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'AUTHENTICATION_PACKAGE',
                transport: Transport.GRPC,
                options: {
                    package: 'authentication',
                    protoPath: join(__dirname, '../proto/authentication.proto'),
                    url: 'authentication:3002', 
                },
            },
            {
                name: 'PRODUCT_PACKAGE',
                transport: Transport.GRPC,
                options: {
                    package: 'product',
                    protoPath: join(__dirname, '../proto/product.proto'),
                    url: 'product:3003', 
                },
            },
        ]),
    ],
    providers: [AuthGatewayService, ProductGatewayService],
    controllers: [AppController], // add your controllers if needed
})
export class AppModule { }