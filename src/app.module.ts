import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { User } from './user/user.entity';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { jwtConstants } from './auth/constants';
import { Profile } from './user/profile.entity';
import { Address } from './region/address.entity';
import { City } from './region/city.entity';
import { Country } from './region/country.entity';
import { CountryService } from './region/country.service';
import { CityService } from './region/city.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql_db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'api_nestjs',
      entities: [User, Profile, Address, City, Country],
      synchronize: true,
      //logging: true,
    }),
    TypeOrmModule.forFeature([User, Profile, Address, City, Country]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [
    AppService,
    UserService,
    CountryService,
    CityService,
    AuthService,
    JwtService,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly countryService: CountryService,
    private readonly cityService: CityService,
    private readonly userService: UserService,
  ) {}

  async onModuleInit() {
    await this.countryService.seedDatabase();
    await this.cityService.seedDatabase();
    await this.userService.seedDatabase();
  }
}
