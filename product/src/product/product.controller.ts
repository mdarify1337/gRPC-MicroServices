import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @GrpcMethod('ProductService', 'CreateProduct')
    createProduct(data: { name: string; price: number; userId: string }) {
        return this.productService.createProduct(data);
    }

    @GrpcMethod('ProductService', 'GetProductsByUser')
    getProductsByUser(data: { userId: string }) {
        return this.productService.getProductsByUser(data.userId);
    }
}
