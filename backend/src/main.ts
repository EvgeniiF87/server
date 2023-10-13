import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InputValidationPipe } from './pipe/input.validation';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new InputValidationPipe());
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
