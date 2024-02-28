import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';

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

  async findAll() {
    const where = {
      assignment: {
        effectiveEndDate: IsNull(),
      },
    };
    const list = await this.vehicleRepository.find({
      select: {
        assignment: {
          id: true,
        },
      },
      where,
      order: { createdAt: 'DESC' },
      relations: { assignment: true },
    });

    return list.map((item) => ({ ...item, isAssigned: !!item.assignment.length, assignment: undefined }));
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

  async update(id: string, payload: UpdateVehicleDto) {
    try {
      const existingCopy = await this.vehicleRepository.find({
        where: [{ id }],
      });

      if (existingCopy.length < 1) {
        throw new BadRequestException({
          message: 'Vehicle with this ID does not exist',
        });
      }

      const newEntity = this.vehicleRepository.create({
        ...payload,
        updatedAt: new Date(),
      });
      const update = await this.vehicleRepository.update({ id }, newEntity);

      if (update.affected > 0) {
        return {
          message: 'Vehicle updated successfully',
          statusCode: HttpStatus.OK,
        };
      }
      throw new BadRequestException('Something went wrong. Please, try again later');
    } catch (error) {
      throw new HttpException(String(error), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
