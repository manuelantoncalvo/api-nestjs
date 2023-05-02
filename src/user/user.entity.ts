import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { IsNotEmpty, MinLength } from 'class-validator';
import { Profile } from './profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ unique: true })
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  @Column()
  password: string;

  @OneToOne(() => Profile, (profile) => profile.user, {
    eager: true,
  })
  profile: Profile;
}
