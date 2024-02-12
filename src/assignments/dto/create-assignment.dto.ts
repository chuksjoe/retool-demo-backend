import { IAssignment } from './assignment.type';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateAssignmentDto implements IAssignment {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  effectiveStartDate: Date;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  effectiveEndDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  assignmentType: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  driverId: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  vehicleId: string;
}
