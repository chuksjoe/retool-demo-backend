import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { Driver } from 'src/drivers/entities/driver.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepo: Repository<Vehicle>,
    @InjectRepository(Driver)
    private readonly driverRepo: Repository<Driver>,
    @InjectRepository(Assignment)
    private readonly assignmentRepo: Repository<Assignment>,
  ) {}

  async getDashboardStat() {
    const vehicleCount = await this.vehicleRepo.count({});
    const assignedVehicleCount = await this.assignmentRepo.count({
      where: { effectiveEndDate: IsNull() },
    });
    const driverCount = await this.driverRepo.count({});

    return {
      driverCount,
      vehicleCount,
      assignedVehicleCount,
    };
  }
}
