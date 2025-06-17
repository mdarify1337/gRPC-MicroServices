import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';


interface ProductService {
  CreateProduct(data: { name: string; price: number; userId: number }): Observable<any>;
}

@Injectable()
export class ProductGatewayService implements OnModuleInit {
  private productService: ProductService;

  constructor(@Inject('PRODUCT_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.productService = this.client.getService<ProductService>('ProductService');
  }

  createProduct(data: { name: string; price: number; userId: number }) {
    return this.productService.CreateProduct(data);
  }
}
