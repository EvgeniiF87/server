import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InputValidationPipe } from './pipe/input.validation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new InputValidationPipe());
  await app.listen(3000);
}
bootstrap();
