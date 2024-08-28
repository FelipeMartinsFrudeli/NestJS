import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Employee, { onDelete: 'SET NULL' })
  manager: Employee;

  // @JoinColumn()
  // managerId: number;

  // @OneToOne(() => ContactInfo, (contactInfo) => contactInfo.employee)
  // contactInfo: ContactInfo;
}
