import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Drivers')
@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  create(@Body() payload: CreateDriverDto) {
    return this.driversService.create(payload);
  }

  @Get()
  findAll() {
    return this.driversService.findAll();
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
