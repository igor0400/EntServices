import { Action, Command, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { ServicesService } from './services.service';

@Update()
export class ServicesUpdate {
  constructor(private readonly servicesService: ServicesService) {}

  @Command('services')
  async servicesCommand(ctx: Context) {
    await this.servicesService.sendServices(ctx);
  }

  @Action('services')
  async servicesBtn(ctx: Context) {
    await this.servicesService.changeToServices(ctx);
  }
}
