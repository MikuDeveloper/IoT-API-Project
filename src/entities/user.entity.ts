import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn()
  email: string;

  @Column()
  firstname: string;

  @Column()
  lastname1: string;

  @Column({ nullable: true })
  lastname2: string;

  @Column()
  role: string;
}
