import { Column } from 'typeorm';

export class IBase {
  @Column({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamptz', name: 'updated_at', nullable: true })
  updatedAt: Date;
}
