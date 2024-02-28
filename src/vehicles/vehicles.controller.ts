import { Controller, Get, Post, Body, Patch, Param, Sse } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';

import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Observable, interval, map } from 'rxjs';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Sse('/sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(map(() => ({ data: { hello: 'world' } }) as MessageEvent));
  }

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }

  @Post('bulk-upload')
  bulkUpload() {
    return 'work in progress';
  }

  @Get()
  findAll() {
    return this.vehiclesService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.vehiclesService.findOne('id', id);
  }

  @Get('search-by-vin/:vin')
  findOneByVin(@Param('vin') vin: string) {
    return this.vehiclesService.findOne('vin', vin);
  }

  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  @Get('search-by-reg-no/:regNo')
  findOneByRegNo(@Param('regNo') regNo: string) {
    return this.vehiclesService.findOne('regNo', regNo);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesService.update(id, updateVehicleDto);
  }
}
