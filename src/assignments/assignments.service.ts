import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UnassignDriverDto, UnassignVehicleDto } from './dto/update-assignment.dto';
import { IAssignmentQuery } from './dto/assignment.type';
import { Assignment } from './entities/assignment.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepo: Repository<Assignment>,
  ) {}

  async create(payload: CreateAssignmentDto) {
    try {
      const driverActiveAssignment = await this.assignmentRepo.find({
        where: {
          driver: { id: payload.driverId },
          effectiveEndDate: IsNull(),
        },
      });
      if (driverActiveAssignment.length) {
        throw new HttpException('Driver is currently assigned to a vehicle.', HttpStatus.BAD_REQUEST);
      }

      const vehicleActiveAssignment = await this.assignmentRepo.find({
        where: {
          vehicle: { id: payload.vehicleId },
          effectiveEndDate: IsNull(),
        },
      });
      if (vehicleActiveAssignment.length) {
        throw new HttpException('Vehicle is currently assigned to a driver.', HttpStatus.BAD_REQUEST);
      }

      const newAssignment = this.assignmentRepo.create({
        ...payload,
        driver: { id: payload.driverId },
        vehicle: { id: payload.vehicleId },
        createdAt: new Date(),
      });
      const assignment = await this.assignmentRepo.save(newAssignment);

      return {
        data: assignment,
        message: 'An assignment has be created successful.',
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(query: IAssignmentQuery) {
    const { driverId, vehicleId, assignmentType } = query;
    const where = {
      driver: driverId ? { id: driverId } : null,
      vehicle: vehicleId ? { id: vehicleId } : null,
      assignmentType,
    };

    return this.assignmentRepo.find({ where }).then((assignments) =>
      assignments.map((assignment) => ({
        ...assignment,
        isActive: assignment.effectiveEndDate === null,
      })),
    );
  }

  async findOne(id: string) {
    try {
      const assignment = await this.assignmentRepo.findOne({ where: { id } });

      if (assignment) {
        return {
          data: {
            ...assignment,
            isActive: assignment.effectiveEndDate === null,
          },
          message: 'Assignment fetched successfully.',
          statusCode: HttpStatus.OK,
        };
      }

      throw new NotFoundException('Assignment not  found.');
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async unassignDriver(payload: UnassignDriverDto) {
    const { driverId, effectiveEndDate } = payload;
    try {
      const driverActiveAssignment = await this.assignmentRepo.find({
        where: { driver: { id: driverId }, effectiveEndDate: IsNull() },
      });

      if (driverActiveAssignment.length) {
        const [activeAssignment] = driverActiveAssignment;

        if (new Date(effectiveEndDate) < new Date(activeAssignment.effectiveStartDate)) {
          throw new BadRequestException('The effective end date must be greater than the start date.');
        }
        const update = await this.assignmentRepo.update(
          { id: activeAssignment.id },
          { effectiveEndDate, updatedAt: new Date() },
        );

        if (update.affected > 0) {
          return {
            message: 'Driver unassigned successfully',
            statusCode: HttpStatus.OK,
          };
        }
        throw new BadRequestException('Something went wrong. Please, try again later');
      }
      throw new BadRequestException('Driver does not have an active assignment.');
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async unassignVehicle(payload: UnassignVehicleDto) {
    const { vehicleId, effectiveEndDate } = payload;
    try {
      const vehicleActiveAssignment = await this.assignmentRepo.find({
        where: { vehicle: { id: vehicleId }, effectiveEndDate: IsNull() },
      });

      if (vehicleActiveAssignment.length) {
        const [activeAssignment] = vehicleActiveAssignment;

        if (new Date(effectiveEndDate) < new Date(activeAssignment.effectiveStartDate)) {
          throw new BadRequestException('The effective end date must be greater than the start date.');
        }
        const update = await this.assignmentRepo.update(
          { id: activeAssignment.id },
          { effectiveEndDate, updatedAt: new Date() },
        );

        if (update.affected > 0) {
          return {
            message: 'Vehicle unassigned successfully',
            statusCode: HttpStatus.OK,
          };
        }
        throw new BadRequestException('Something went wrong. Please, try again later');
      }
      throw new BadRequestException('Vehicle does not have an active assignment.');
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
