import { Module } from '@nestjs/common';
import { LinksModule } from './links/links.module';
import { TerminusModule } from '@nestjs/terminus';
import { TerminusOptionsService } from './terminus-options.service';
import { DBModule } from './db/db.module';
import { GoogleGuard } from './google.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: GoogleGuard,
    },
  ],
  imports: [LinksModule,
    TerminusModule.forRootAsync({
      useClass: TerminusOptionsService,
    }),
    DBModule,
  ],
})
export class AppModule { }
