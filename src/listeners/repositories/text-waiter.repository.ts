import { AbstractRepository } from 'src/libs/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  TextWaiter,
  TextWaiterCreationArgs,
} from '../models/text-waiter.model';

@Injectable()
export class TextWaitersRepository extends AbstractRepository<
  TextWaiter,
  TextWaiterCreationArgs
> {
  protected readonly logger = new Logger(TextWaiter.name);

  constructor(
    @InjectModel(TextWaiter)
    private textWaiterModel: typeof TextWaiter,
  ) {
    super(textWaiterModel);
  }
}
