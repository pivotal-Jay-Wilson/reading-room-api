import { createConnection } from 'typeorm';

import { Link } from '../links/link.entity';

import * as  cfenv from 'cfenv';
const svc = cfenv.getAppEnv().getService('CareLog');

export const dbProvider = {
    provide: 'DbConnectionToken',
    useFactory: async () => await createConnection({
      type: 'postgres',
      host: svc.credentials.db_host,
      port: svc.credentials.db_port,
      database: svc.credentials.db_name,
      username: svc.credentials.username,
      password: svc.credentials.password,
      entities: [
        Link,
      ],
      synchronize: true, // DEV only, do not use on PROD!
    }),
  };
