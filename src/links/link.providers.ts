import { Connection } from 'typeorm';

import { Link } from './link.entity';

export const linkProviders = [{
    provide: 'LinkRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Link),
    inject: ['DbConnectionToken'],
}];
