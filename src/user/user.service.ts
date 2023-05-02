import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { usersSeed } from '../seeds/users.seed';
import { Profile } from './profile.entity';
import { Address } from '../region/address.entity';
import { CreateUserDto } from './create-user-dto';
import { City } from '../region/city.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}

  async create(user: User): Promise<User> {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    return await this.userRepository.save(user);
  }

  async createFromRequest(createUserDto: CreateUserDto): Promise<User> {
    const city = await this.cityRepository.findOne({
      where: { id: createUserDto.city_id },
    });
    const address = new Address();
    address.street = createUserDto.address;
    address.city = city;
    await this.addressRepository.save(address);

    const profile = new Profile();
    profile.first_name = createUserDto.first_name;
    profile.last_name = createUserDto.last_name;
    profile.address = address;
    await this.profileRepository.save(profile);

    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.profile = profile;
    await this.create(user);

    return user;
  }

  async getById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async getByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  async seedDatabase() {
    if ((await this.getCount()) == 0) {
      for (const userSeed of usersSeed) {
        const createUserDto = Object.assign(new CreateUserDto(), userSeed);
        await this.createFromRequest(createUserDto);
      }
    }
  }

  async getCount(): Promise<number> {
    return this.userRepository.count();
  }
}
