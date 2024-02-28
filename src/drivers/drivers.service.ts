import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { fromEvent, map } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { CreateDriverDto, UpdateDriverDto } from './dto/driver.dto';
import { Driver } from './entities/driver.entity';
import { IDriversQuery } from './dto/drive.type';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepo: Repository<Driver>,
    private eventEmitter: EventEmitter2,
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
      const data = {
        type: 'create',
        message: 'A new driver has been created.',
      };

      this.eventEmitter.emit('drivers:feed', data);
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

  async findAll(query: IDriversQuery) {
    const { page = 1, limit = 20 } = query;

    const where = {};
    const list = await this.driverRepo.find({
      where,
      order: { createdAt: 'DESC', assignment: { createdAt: 'DESC' } },
      relations: { assignment: true },
      skip: (page - 1) * limit + 1,
      take: limit,
    });

    const count = await this.driverRepo.count({ where });

    const pagination = {
      count,
      page: Number(page),
      limit: Number(limit),
      pageCount: Math.ceil(count / limit),
    };

    return {
      pagination,
      data: list.map((item) => ({
        ...item,
        isAssigned: Boolean(item.assignment.length && !item.assignment[0].effectiveEndDate),
        assignment: undefined,
      })),
    };
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
    const data = {
      type: 'update',
      message: `Driver with ID #${id} has been updated`,
    };
    this.eventEmitter.emit('drivers:feed', data);
    return `This action updates a #${id} driver`;
  }

  subscribeToDriversFeed() {
    return fromEvent(this.eventEmitter, 'drivers:feed').pipe(
      map((data: { message: string; type: string }) => {
        return new MessageEvent('drivers:feed', { data });
      }),
    );
  }
}
