import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.enableCors({ origin: true });
  await app.listen(process.env.PORT);
  console.log(
    `server is running on the port http://localhost:${process.env.PORT}`,
  );
  
}
bootstrap();
