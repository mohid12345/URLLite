import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  console.log('✅ NestJS is starting...');

  // Enable CORS with multiple allowed origins
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://yourfrontenddomain.com', // Replace with your actual frontend domain
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Enable credentials (cookies, authorization headers)
  });

  // Use Morgan for logging requests
  app.use(morgan('combined'));

  await app.listen(3000);
  console.log(`🚀 Server is running on: http://localhost:3000`);
}

bootstrap();



// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { MorganLoggerService } from './auth/logger';
// import * as morgan from 'morgan';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.useGlobalPipes(new ValidationPipe({
//     whitelist:true,
//     forbidNonWhitelisted:true
//   }))

//   // const morganLogger = new MorganLoggerService();

//   // Use morgan middleware with the NestJS application
//   // app.use(morgan('combined', { stream: { write:(message)=>morganLogger.log(message.trim()) } }));
 
//   console.log('✅ NestJS is starting...');

//   app.enableCors({
//     origin:"http://localhost:5173",
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     // allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
//   });
//   await app.listen(3000);
// }
// bootstrap();
