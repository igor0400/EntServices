import { Module } from '@nestjs/common';
import { ChainService } from './chain.service';
import { ChainUpdate } from './chain.update';

@Module({
  providers: [ChainService, ChainUpdate],
})
export class ChainModule {}
