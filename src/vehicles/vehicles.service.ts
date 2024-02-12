import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(payload: CreateVehicleDto) {
    try {
      const existingCopy = await this.vehicleRepository.find({
        where: [{ vin: payload.vin }, { regNo: payload.regNo }],
      });

      if (existingCopy.length > 0) {
        throw new BadRequestException({
          message: 'Vehicle with this VIN or Reg No already exist',
        });
      }

      const newEntity = this.vehicleRepository.create({
        ...payload,
        createdAt: new Date(),
      });
      const vehicle = await this.vehicleRepository.save(newEntity);

      return {
        status: HttpStatus.CREATED,
        message: 'Vehicle created successful',
        data: vehicle,
      };
    } catch (error) {
      throw new HttpException(String(error), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return this.vehicleRepository.find();
  }

  async findOne(type: 'vin' | 'id' | 'regNo', value: string) {
    try {
      const vehicle = await this.vehicleRepository.findOne({
        where: { [type]: value },
      });

      if (!vehicle) {
        throw new NotFoundException(`Vehicle with this ${type}(${value}) does not exist`);
      }

      return {
        statusCode: HttpStatus.OK,
        data: vehicle,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  update(id: string, updateVehicleDto: UpdateVehicleDto) {
    console.log(updateVehicleDto);
    return `This action updates a #${id} vehicle`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
