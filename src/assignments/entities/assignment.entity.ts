import { IBase } from 'src/base/base.entity';
import { IAssignment } from '../dto/assignment.type';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Driver } from 'src/drivers/entities/driver.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';

@Entity('assignments')
export class Assignment extends IBase implements IAssignment {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'timestamptz', name: 'effect_start_date' })
  effectiveStartDate: Date;

  @Column({ type: 'timestamptz', name: 'effect_end_date', nullable: true })
  effectiveEndDate: Date;

  @Column({ type: 'text', name: 'assignment_type' })
  assignmentType: string;

  @ManyToOne(() => Driver, (driver) => driver.assignment, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.assignment, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;
}
