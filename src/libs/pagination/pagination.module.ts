import { Module, forwardRef } from '@nestjs/common';
import { PaginationService } from './pagination.service';
import { DatabaseModule } from 'src/libs/common';
import { PaginationRepository } from './repositories/pagination.repository';
import { Pagination } from './models/pagination.model';
import { PaginationUpdate } from './pagination.update';
import { GeneralModule } from 'src/general/general.module';

@Module({
  imports: [DatabaseModule.forFeature([Pagination]), forwardRef(() => GeneralModule)],
  providers: [PaginationService, PaginationUpdate, PaginationRepository],
  exports: [PaginationService, PaginationRepository],
})
export class PaginationModule {}
