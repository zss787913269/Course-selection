import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express' 

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
 app.useStaticAssets('public')

 app.use(cors({
  origin:"*",
  credentials:true
}));


  await app.listen(3001); 
}
bootstrap();
