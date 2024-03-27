import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Role } from '../authorization/role.enum';

@Entity('users')
export class User {
  @PrimaryColumn()
  uuid: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname1: string;

  @Column({ nullable: true })
  lastname2: string;

  @Column({ nullable: true })
  role: Role;
}
