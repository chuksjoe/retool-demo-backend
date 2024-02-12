import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { IVehicle } from '../dto/vehicle.type';
import { IBase } from 'src/base/base.entity';
import { Assignment } from 'src/assignments/entities/assignment.entity';

@Entity({ name: 'vehicles' })
export class Vehicle extends IBase implements IVehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', name: 'batch_id', nullable: true })
  batchId: string;

  @Column({ type: 'varchar', unique: true })
  vin: string;

  @Column({ type: 'varchar', name: 'market_code' })
  marketCode: string;

  @Column({ type: 'varchar', name: 'country_code_of_registration' })
  countryCodeOfRegistration: string;

  @Column({ type: 'varchar', name: 'engine_number' })
  engineNumber: string;

  @Column({ type: 'varchar' })
  model: string;

  @Column({ type: 'integer', name: 'year_of_production' })
  yearOfProduction: number;

  @Column({ type: 'varchar', name: 'purchase_currency' })
  purchaseCurrency: string;

  @Column({ type: 'varchar' })
  color: string;

  @Column({ type: 'timestamptz', name: 'purchase_date' })
  purchaseDate: Date;

  @Column({ type: 'varchar', name: 'supplier' })
  supplier: string;

  @Column({
    type: 'varchar',
    name: 'registration_number',
    unique: true,
    nullable: true,
  })
  regNo?: string;

  @Column({ type: 'numeric', name: 'purchase_price', nullable: true })
  purchasePrice?: number;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @OneToMany(() => Assignment, (assignment) => assignment.vehicle)
  assignment: Assignment[];
}
