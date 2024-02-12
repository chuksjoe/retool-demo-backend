import { Controller, Get, Post, Body, Param, BadRequestException, Query } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UnassignDriverDto, UnassignVehicleDto } from './dto/update-assignment.dto';
import { ApiTags } from '@nestjs/swagger';
import { QueryAssignmentDto } from './dto/query-assignment.dto';

@ApiTags('Vehicle assignments to drivers')
@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post()
  create(@Body() payload: CreateAssignmentDto) {
    if (payload.effectiveEndDate < payload.effectiveStartDate) {
      throw new BadRequestException('The effective end date must be greater than the start date.');
    }

    return this.assignmentsService.create(payload);
  }

  @Get()
  findAll(@Query() query: QueryAssignmentDto) {
    return this.assignmentsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignmentsService.findOne(id);
  }

  @Post('unassign-driver')
  unassignDriver(@Body() payload: UnassignDriverDto) {
    return this.assignmentsService.unassignDriver(payload);
  }

  @Post('unassign-vehicle')
  unassignVehicle(@Body() payload: UnassignVehicleDto) {
    return this.assignmentsService.unassignVehicle(payload);
  }
}
