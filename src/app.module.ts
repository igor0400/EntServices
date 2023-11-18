import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';
import { StartModule } from './start/start.module';
import { MenuModule } from './menu/menu.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServicesModule } from './services/services.module';
import { GeneralModule } from './general/general.module';
import { InfoModule } from './info/info.module';
import { validationSchema } from './libs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './general/database/database.module';
import { ListenersModule } from './listeners/listeners.module';
import { CalendarModule } from './calendar/calendar.module';

const sessions = new LocalSession({ database: 'session_db.json' });

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TelegrafModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        token: configService.get('BOT_TOKEN'),
        middlewares: [sessions.middleware()],
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
    StartModule,
    MenuModule,
    ServicesModule,
    GeneralModule,
    InfoModule,
    UsersModule,
    ListenersModule,
    CalendarModule,
  ],
})
export class AppModule {}
