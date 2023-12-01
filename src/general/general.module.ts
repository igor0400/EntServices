import { Module, forwardRef } from '@nestjs/common';
import { GeneralValidations } from './general.validations';
import { GeneralButtons } from './general.buttons';
import { GeneralMiddlewares } from './general.middlewares';
import { GeneralPresets } from './general.presets';
import { MenuModule } from '../menu/menu.module';
import { UsersModule } from 'src/users/users.module';
import { ListenersModule } from 'src/listeners/listeners.module';
import { BansModule } from 'src/bans/bans.module';

@Module({
  imports: [
    forwardRef(() => MenuModule),
    forwardRef(() => UsersModule),
    forwardRef(() => ListenersModule),
    forwardRef(() => BansModule),
  ],
  providers: [
    GeneralValidations,
    GeneralButtons,
    GeneralMiddlewares,
    GeneralPresets,
  ],
  exports: [
    GeneralValidations,
    GeneralButtons,
    GeneralMiddlewares,
    GeneralPresets,
  ],
})
export class GeneralModule {}
