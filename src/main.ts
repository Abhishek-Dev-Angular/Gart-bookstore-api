import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
  }
  dotenv.config({path:__dirname+'/.env'});
  app.enableCors(corsOptions);
  console.log('*************** Your Gartner API is listening on port 3000 *******************')
  await app.listen(3000);
}
bootstrap();
