import { Module, forwardRef } from '@nestjs/common';
import { GeneralValidations } from './general.validations';
import { GeneralButtons } from './general.buttons';
import { GeneralMiddlewares } from './general.middlewares';
import { GeneralPresets } from './general.presets';
import { MenuModule } from '../menu/menu.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [forwardRef(() => MenuModule), forwardRef(() => UsersModule)],
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
