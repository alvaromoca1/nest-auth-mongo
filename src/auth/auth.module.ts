import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AutorizationMiddleware } from 'src/common/middleware/autorization.middleware';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Users, UsersSchema } from './schemas/users.schema';

@Module({
    imports:[ConfigModule.forRoot({
      envFilePath:['.env'],
      isGlobal:true,
    }),
    MongooseModule.forFeature([{name:Users.name,schema:UsersSchema}]),
    PassportModule,
    JwtModule.register({
      secret:process.env.JWT_SECRET,
      signOptions:{expiresIn: process.env.JWT_EXPIRES}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {
  //mdware pra los controladores
  /*configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AutorizationMiddleware)
    .forRoutes(
      AuthController or '*'
    );
  }*/
}
