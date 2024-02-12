import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepo: Repository<Driver>,
  ) {}

  async create(payload: CreateDriverDto) {
    try {
      const existingCopy = await this.driverRepo.find({
        where: [{ drn: payload.drn }, { email: payload.email }],
      });

      if (existingCopy.length > 0) {
        throw new BadRequestException({ message: 'Driver with this Email or DRN already exist' });
      }

      const driverEntity = this.driverRepo.create({
        ...payload,
        createdAt: new Date(),
      });
      const driver = await this.driverRepo.save(driverEntity);
      return {
        data: driver,
        message: 'New driver created successfully',
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return this.driverRepo.find();
  }

  async findOne(type: 'drn' | 'id' | 'email', value: string) {
    try {
      const vehicle = await this.driverRepo.findOne({
        where: { [type]: value },
      });

      if (!vehicle) {
        throw new NotFoundException(`Driver with this ${type}(${value}) does not exist`);
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

  update(id: string, payload: UpdateDriverDto) {
    console.log(payload);
    return `This action updates a #${id} driver`;
  }

  remove(id: string) {
    return `This action removes a #${id} driver`;
  }
}
