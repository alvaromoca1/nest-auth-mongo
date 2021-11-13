import{ConfigModule}from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AutorizationMiddleware } from './common/middleware/autorization.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
        envFilePath:['.env'],
        isGlobal:true,
      }),
      MongooseModule.forRoot(process.env.URI_MONGODB),
      AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
