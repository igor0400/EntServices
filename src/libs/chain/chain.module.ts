import { Module } from '@nestjs/common';
import { ChainService } from './chain.service';
import { ChainRepository } from './repositories/chain.repository';
import { ChainFieldRepository } from './repositories/chain-field.repository';
import { DatabaseModule } from '../common';
import { Chain } from './models/chain.model';
import { ChainField } from './models/chain-field.model';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DatabaseModule.forFeature([Chain, ChainField]), UsersModule],
  providers: [ChainService, ChainRepository, ChainFieldRepository],
  exports: [ChainService, ChainRepository, ChainFieldRepository],
})
export class ChainModule {}
