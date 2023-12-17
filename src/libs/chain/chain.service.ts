import { Injectable } from '@nestjs/common';
import { ChainRepository } from './repositories/chain.repository';
import { ChainFieldRepository } from './repositories/chain-field.repository';
import { UserRepository } from 'src/users/repositories/user.repository';
import { ChainField } from './models/chain-field.model';

@Injectable()
export class ChainService {
  constructor(
    private readonly chainRepository: ChainRepository,
    private readonly chainFieldRepository: ChainFieldRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async clearUserChains(userTgId: string) {
    const user = await this.userRepository.findByTgId(userTgId);
    const chain = await this.chainRepository.findOne({
      where: {
        userId: user.id,
      },
      include: [ChainField],
    });
    if (!chain) return;
    await this.chainFieldRepository.destroy({
      where: {
        chainId: chain.id,
      },
    });
  }
}
