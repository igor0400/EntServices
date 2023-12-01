import { Injectable } from '@nestjs/common';
import { Context } from 'telegraf';
import { getCtxData } from 'src/libs/common';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async updateUserNamesByCtx(ctx: Context) {
    const { user } = getCtxData(ctx);
    const telegramId = user.id;
    const firstName = user.first_name;
    const lastName = user.last_name;
    const userName = user.username;

    await this.userRepository.update(
      { firstName, lastName, userName },
      { where: { telegramId } },
    );
  }
}
