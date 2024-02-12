import { IsNotEmpty, IsEmail, IsDateString, IsNumberString, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { IDriver } from './drive.type';

export class CreateDriverDto implements IDriver {
  @ApiProperty()
  @IsNotEmpty()
  drn!: string;

  @ApiProperty()
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  middleName?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  dateOfBirth!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  phone!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  imageUrl?: string;

  @ApiProperty()
  @IsNotEmpty()
  address!: string;

  @ApiProperty()
  @IsNotEmpty()
  country!: string;
}
