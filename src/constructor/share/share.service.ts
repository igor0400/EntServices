import { Injectable } from '@nestjs/common';
import { Context } from 'telegraf';
import { ConstructorService } from '../constructor.service';

@Injectable()
export class ShareConstructorService {
  constructor(private readonly constructorService: ConstructorService) {}

  async argsHandler(ctx: Context | any) {
    await this.constructorService.sendStartConstructor(ctx);
  }
}
