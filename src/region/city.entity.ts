import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Country } from './country.entity';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ unique: true })
  name: string;

  @ManyToOne(() => Country, { eager: true })
  @JoinColumn()
  country: Country;
}
