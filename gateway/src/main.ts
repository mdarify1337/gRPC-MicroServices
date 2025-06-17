import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply global validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // You can enable CORS if your frontend connects to this
  app.enableCors();

  const port = 3001;
  await app.listen(port);

  Logger.log(`🚀 Gateway is running on http://localhost:${port}`);
  console.log('🚀 Gateway Service is running on gRPC at 0.0.0.0:3001');
}
bootstrap();
