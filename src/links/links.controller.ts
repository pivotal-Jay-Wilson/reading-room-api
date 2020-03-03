
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { CreateLinkDto, Params } from './create-link.dto';
import { LinksService } from './links.service';
import { ILink } from './link.interface';
import { ApiCreatedResponse, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Link } from './link.entity';

@ApiBearerAuth()
@Controller('Links')
export class LinksController {

  constructor(private readonly linksService: LinksService) { }

  @Get()
  async findAll(): Promise<ILink[]> {
    return this.linksService.findAll();
  }

  @Post('/find')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Link,
  })
  async findInfin(@Body() params: Params): Promise<ILink[]> {
    return this.linksService.findAllInfin(params);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Link,
  })
  async create( @Body() createLinkDto: CreateLinkDto) {
    const newLink = Object.assign({}, createLinkDto, {
      url: createLinkDto.url,
      mediaDt: createLinkDto.mediaDt,
      createdAt: new Date(),
      authorId: createLinkDto.authorId,
      categoryId: createLinkDto.categoryId,
    });
    await this.linksService.create(newLink);
  }

  @Put()
  async update( @Body() createLinkDto: CreateLinkDto) {
    const newLink = Object.assign({}, createLinkDto, {
      id: createLinkDto.id,
      url: createLinkDto.url,
      mediaDt: createLinkDto.mediaDt,
      authorId: createLinkDto.authorId,
      categoryId: createLinkDto.categoryId,
    });
    await this.linksService.update(newLink);
  }

  @Delete('/:linkId')
  @ApiResponse({
    status: 201,
    description: 'link marked as deleted',
    type: Link,
  })
  delete( @Param('linkId') linkId: number) {
    return this.linksService.deleteOne(linkId);
  }

  @Delete('/all')
  @ApiResponse({
    status: 201,
    description: 'Truncate links',
    type: Link,
  })
  deleteAll() {
    return this.linksService.deleteAll();
  }
}
