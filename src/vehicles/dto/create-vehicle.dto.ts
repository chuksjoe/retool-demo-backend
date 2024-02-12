import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsAlphanumeric,
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
  Min,
} from 'class-validator';

import { IVehicle } from './vehicle.type';

export class CreateVehicleDto implements IVehicle {
  @ApiProperty()
  @IsNotEmpty()
  @IsAlphanumeric()
  @Length(17, 17)
  @Matches(/[A-HJ-NPR-Z0-9]{17}$/, { message: 'vin pattern is invalid' })
  vin!: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(3, 3)
  @IsAlpha()
  marketCode!: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(3, 3)
  @IsAlpha()
  countryCodeOfRegistration!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsAlphanumeric()
  engineNumber!: string;

  @ApiProperty()
  @IsNotEmpty()
  model!: string;

  @ApiProperty()
  @IsNumber()
  @IsDefined()
  @Min(1980)
  yearOfProduction!: number;

  @ApiProperty()
  @Length(3, 3)
  @IsNotEmpty()
  @IsAlpha()
  purchaseCurrency!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  color!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  purchaseDate!: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  supplier!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsAlphanumeric()
  regNo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @IsDefined()
  purchasePrice?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
