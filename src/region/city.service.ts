import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { citiesSeed } from '../seeds/cities.seed';
import { City } from './city.entity';
import { Country } from './country.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async seedDatabase() {
    if ((await this.getCount()) == 0) {
      for (const citySeed of citiesSeed) {
        const country = await this.countryRepository.findOne({
          where: { id: citySeed.country_id },
        });

        const newCity = <City>(<unknown>{
          id: citySeed.id,
          name: citySeed.name,
          country: country,
        });

        await this.cityRepository.save(newCity);
      }
    }
  }

  async getCount(): Promise<number> {
    return this.cityRepository.count();
  }
}
