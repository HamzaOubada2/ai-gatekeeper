import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, // use Fastify as HTTP server instead Express
   NestFastifyApplication  //This tells TypeScript that the app is a NestJS application built using Fastify.
} from '@nestjs/platform-fastify';

  
async function bootstrap() {
  const  app = await NestFactory.create<NestFastifyApplication>(
    AppModule, 
    new FastifyAdapter(), //Use Fastify as your HTTP platform.
  );


  await app.listen(3000, "0.0.0.0");
  console.log("Server Is Running on: http://localhost:3000")
}
bootstrap();
