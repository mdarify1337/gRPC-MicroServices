import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'postgres',
            port: parseInt('5432', 10),
            username: 'postgres',
            password: 'postgres',
            database: 'grpc_db',
            entities: [Product],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([Product]),
    ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
