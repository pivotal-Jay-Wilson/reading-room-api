import { Module } from '@nestjs/common';

import { dbProvider } from './db.providers';

@Module({
  imports: [],
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DBModule { }
