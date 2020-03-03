import { Inject, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ILink } from './link.interface';
import * as moment from 'moment';

@Injectable()
export class LinksService {
  private readonly logger = new Logger(LinksService.name);
  constructor( @Inject('LinkRepositoryToken') private readonly LinkRepository: Repository<ILink>) { }

  async findAll(): Promise<ILink[]> {
    try {
      return await this.LinkRepository.find();
    } catch (err) {
      this.logger.error(err);
      return err;
    }
  }

  async findAllInfin(params) {
    const skip = params.startRow;
    const end = params.endRow;
    const take = end - skip;
    let ob = {};
    for (const sort of params.sortModel) {
      ob['l.' + sort.colId] = sort.sort;
    }
    try {
      let where;
      if (params.filterWeek) {
        const startDt = moment(params.filterWeek);
        const endDt =  moment(params.filterWeek).add(1, 'week');
        where = `l.mediaDt Between '${startDt.utc().format()}' AND '${endDt.utc().format()}' `;
      } else {
        where = {};
      }
      const [links, count] = await this.LinkRepository.createQueryBuilder('l')
        .where(where)
        .skip(skip)
        .take(take)
        .orderBy(ob)
        .getManyAndCount();
      return {
        count,
        links,
      };
    } catch (err) {
      this.logger.error(err);
      return err;
    }
  }

  async create(link: ILink) {
    if (!link.id) {
      const idString = link.title + link.url;
      let hash = 0;
      let chr;
      for (let i = 0; i < idString.length; i++) {
          chr   = idString.charCodeAt(i);
          // tslint:disable-next-line: no-bitwise
          hash  = ((hash << 5) - hash) + chr;
          // tslint:disable-next-line: no-bitwise
          hash |= 0;
        }
      link.id = hash;
    }
    try {
      return await this.LinkRepository.save(link);
    } catch (err) {
      this.logger.error(err);
      return err;
    }
  }

  async update(link: ILink) {
    try {
      if (link.usedAt) {
         await this.LinkRepository.updateById(link.id, {usedAt: new Date()});
      } else {
        await this.LinkRepository.updateById(link.id, link);
      }
      return true;
    } catch (err) {
      this.logger.error(err);
      return err;
    }
  }

  async deleteOne(linkId: number) {
    try {
      return await this.LinkRepository.removeById(linkId);
    } catch (err) {
      this.logger.error(err);
      return err;
    }
  }

  async deleteAll() {
    try {
      return await this.LinkRepository.clear();
    } catch (err) {
      this.logger.error(err);
      return err;
    }

  }
  
  async findbyWeek(date: string, start: number, take: number) {
    const startDt = moment(date);
    const endDt =  moment(date).add(1, 'week');
    const [links, count] = await this.LinkRepository.createQueryBuilder('link')
      .where(`link.mediaDt Between '${startDt.utc().format()}' AND '${endDt.utc().format()}' `)
      .skip(start)
      .take(take)
      .orderBy()
      .getManyAndCount();

    return {
      count,
      links,
    };
  }

}
