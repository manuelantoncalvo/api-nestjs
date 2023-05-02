import { Injectable } from '@nestjs/common';
import { Country } from './country.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { countriesSeed } from '../seeds/countries.seed';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async seedDatabase() {
    if ((await this.getCount()) == 0) {
      await this.countryRepository.save(countriesSeed);
    }
  }

  async getCount(): Promise<number> {
    return this.countryRepository.count();
  }
}
