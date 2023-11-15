import { Module } from '@nestjs/common';
import { AppUpdate } from './app.update';
import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';
import { AppButtons } from './app.buttons';
import { StartModule } from './start/start.module';
import { MenuModule } from './menu/menu.module';
import { ConfigModule } from '@nestjs/config';

const sessions = new LocalSession({ database: 'session_db.json' });

@Module({
  imports: [
    TelegrafModule.forRoot({
      middlewares: [sessions.middleware()],
      token: process.env.BOT_TOKEN,
    }),
    ConfigModule.forRoot({
      // validationSchema,
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    StartModule,
    MenuModule,
  ],
  providers: [AppUpdate, AppButtons],
})
export class AppModule {}
