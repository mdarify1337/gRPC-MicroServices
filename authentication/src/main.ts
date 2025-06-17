import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'node:path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'authentication',
      protoPath: join(__dirname, '../proto/authentication.proto'),
      url: '0.0.0.0:3002',
    },
  });
  await app.listen();
  console.log('🚀 Product Service is running on gRPC at 0.0.0.0:3002');
}
bootstrap();
