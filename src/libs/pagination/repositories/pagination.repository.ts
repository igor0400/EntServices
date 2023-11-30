import { AbstractRepository } from 'src/libs/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Pagination, PaginationCreationArgs } from '../models/pagination.model';
import { DestroyOptions, FindOptions } from 'sequelize';

@Injectable()
export class PaginationRepository extends AbstractRepository<
  Pagination,
  PaginationCreationArgs
> {
  protected readonly logger = new Logger(Pagination.name);

  constructor(
    @InjectModel(Pagination)
    private paginationModel: typeof Pagination,
  ) {
    super(paginationModel);
  }

  async findByUserTgId(
    userTgId: string | number,
    options?: Omit<FindOptions<Pagination>, 'where'>,
  ) {
    const document = await this.paginationModel.findOne({
      where: {
        userTelegramId: userTgId,
      },
      ...options,
    });

    return document as Pagination;
  }

  async destroyByUserTgId(
    userTgId: string | number,
    options?: Omit<DestroyOptions<Pagination>, 'where'>,
  ) {
    const document = await this.paginationModel.destroy({
      where: {
        userTelegramId: userTgId,
      },
      ...options,
    });

    return document;
  }
}
