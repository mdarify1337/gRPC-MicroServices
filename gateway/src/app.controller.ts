import { Controller, Post, Body } from '@nestjs/common';
import { AuthGatewayService } from './authentication.service';
import { ProductGatewayService } from './product.service';

@Controller()
export class AppController {
    constructor(
        private readonly authService: AuthGatewayService,
        private readonly productService: ProductGatewayService,
    ) { }

    @Post('authentication/register')
    register(@Body() body: { email: string; password: string; username?: string }) {
        return this.authService.registerUser(body.email, body.password, body.username ?? '');
    }

    @Post('product/create')
    create(@Body() body: { name: string; price: number; userId: number }) {
        return this.productService.createProduct(body);
    }
}
