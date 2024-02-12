import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';

import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
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
