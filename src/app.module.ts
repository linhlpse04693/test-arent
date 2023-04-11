import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BodyRecordModule } from './body-record/body-record.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { DatabaseModule } from './database/database.module';
import { DiaryModule } from './diary/diary.module';
import { ExerciseModule } from './exercise/exercise.module';
import { JsonWebTokenStrategy } from './auth/strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JWTAuthenticationGuard } from './auth/guards/auth.guard';
import { MealModule } from './meal/meal.module';
import { ColumnModule } from './column/column.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    DatabaseModule,
    BodyRecordModule,
    UserModule,
    AuthModule,
    DiaryModule,
    ExerciseModule,
    MealModule,
    ColumnModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JsonWebTokenStrategy,
    {
      provide: APP_GUARD,
      useClass: JWTAuthenticationGuard,
    },
  ],
})
export class AppModule {}
