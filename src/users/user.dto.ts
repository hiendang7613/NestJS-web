import { Expose, Transform } from 'class-transformer';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class UserDto {
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  firstName: string;

  @Column()
  lastName: string;

  @Transform(({ obj }) => obj.firstName + ' ' + obj.lastName)
  @Expose()
  fullName: String;

  @Column()
  isActive: boolean;
}
