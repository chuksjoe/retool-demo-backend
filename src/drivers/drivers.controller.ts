import { Controller, Get, Post, Body, Patch, Param, Sse, MessageEvent, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { DriversService } from './drivers.service';
import { CreateDriverDto, UpdateDriverDto } from './dto/driver.dto';
import { IDriversQuery } from './dto/drive.type';

@ApiTags('Drivers')
@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Sse('/sse')
  sse(): Observable<MessageEvent> {
    return this.driversService.subscribeToDriversFeed();
  }

  @Post()
  create(@Body() payload: CreateDriverDto) {
    return this.driversService.create(payload);
  }

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'page number',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'search with DRN or name',
  })
  @ApiQuery({
    name: 'country',
    required: false,
    description: 'filter by country',
  })
  findAll(@Query() query: IDriversQuery) {
    return this.driversService.findAll(query);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.driversService.findOne('id', id);
  }

  @Get('find-by-email/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.driversService.findOne('email', email);
  }

  @Get('find-by-drn/:drn')
  findOneByDrn(@Param('drn') drn: string) {
    return this.driversService.findOne('drn', drn);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driversService.update(id, updateDriverDto);
  }
}
