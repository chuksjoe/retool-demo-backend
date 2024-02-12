import { IBase } from 'src/base/base.entity';
import { IDriver } from '../dto/drive.type';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Assignment } from 'src/assignments/entities/assignment.entity';

@Entity('drivers')
export class Driver extends IBase implements IDriver {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  drn: string;

  @Column({ type: 'text', nullable: true })
  status: string;

  @Column({ type: 'text', name: 'first_name' })
  firstName: string;

  @Column({ type: 'text', name: 'last_name' })
  lastName: string;

  @Column({ type: 'text', name: 'middle_name', nullable: true })
  middleName: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'date', name: 'dob' })
  dateOfBirth: string;

  @Column({ type: 'text' })
  phone: string;

  @Column({ type: 'text', name: 'image_url' })
  imageUrl: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'text', name: 'country' })
  country: string;

  @OneToMany(() => Assignment, (assignment) => assignment.driver)
  assignment: Assignment[];
}
