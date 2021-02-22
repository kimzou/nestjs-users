import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import 'dotenv/config';
import * as admin from 'firebase-admin';
import { AppModule } from './app.module';

async function bootstrap() {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    })
  });
  const app = await NestFactory.create(AppModule);
  // app.enableCors({
  //   credentials: true,
  // })
  app.use(cookieParser());
  await app.listen(4000, () => Logger.log('Users service starting on port 4000...'));
}
bootstrap();
