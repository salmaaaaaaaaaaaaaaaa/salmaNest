import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Employee {
  @ObjectIdColumn()
  id: ObjectId; // id automatique MongoDB

  @Column()
  startTime: Date; // date début

  @Column()
  endTime: Date; // date fin

  @Column()
  hourlyRate: number; // taux horaire
}
