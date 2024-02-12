import { IAssignmentQuery } from './assignment.type';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class QueryAssignmentDto implements IAssignmentQuery {
  @ApiProperty({ required: false })
  @IsOptional()
  assignmentType: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  driverId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  vehicleId: string;
}
