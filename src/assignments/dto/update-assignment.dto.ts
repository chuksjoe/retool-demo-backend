import { PartialType } from '@nestjs/mapped-types';
import { CreateAssignmentDto } from './create-assignment.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateAssignmentDto extends PartialType(CreateAssignmentDto) {}

export class UnassignDriverDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  driverId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  effectiveEndDate: Date;
}

export class UnassignVehicleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  vehicleId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  effectiveEndDate: Date;
}
