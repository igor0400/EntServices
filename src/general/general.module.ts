import { Module } from '@nestjs/common';
import { GeneralValidations } from './general.validations';

@Module({
  providers: [GeneralValidations],
})
export class GeneralModule {}
