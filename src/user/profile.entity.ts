import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Address } from '../region/address.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  first_name: string;

  @IsNotEmpty()
  @Column()
  last_name: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Address, { eager: true })
  @JoinColumn()
  address: Address;
}
