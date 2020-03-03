import { Module } from '@nestjs/common';

import { DBModule } from '../db/db.module';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';
import { linkProviders } from './link.providers';

@Module({
    imports: [DBModule],
    controllers: [LinksController],
    providers: [
        ...linkProviders,
        LinksService,
    ],
    exports: [LinksService],
})
export class LinksModule { }
