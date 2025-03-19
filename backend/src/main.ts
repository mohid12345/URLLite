// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import * as morgan from 'morgan';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // Enable validation globally
//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       forbidNonWhitelisted: true,
//     }),
//   );

//   console.log('✅ NestJS is starting...');

//   // Enable CORS for all origins
//   app.enableCors({
//     origin: '*', // Allows all origins
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true, // Enable credentials if needed
//   });

//   // Use Morgan for logging requests
//   app.use(morgan('combined'));

//   await app.listen(3000);
//   console.log(`🚀 Server is running on: http://localhost:3000`);
// }

// bootstrap();




import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MorganLoggerService } from './auth/logger';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true
  }))

  const morganLogger = new MorganLoggerService();

  // Use morgan middleware with the NestJS application
  app.use(morgan('combined', { stream: { write:(message)=>morganLogger.log(message.trim()) } }));
 
  console.log('✅ NestJS is starting...');

  app.enableCors({
    origin:"http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
