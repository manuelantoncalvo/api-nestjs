import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDto } from './create-user-dto';
import { UserResponseMapper } from '../mappers/user-response-mapper';
import { UserResponseDto } from './user-response-dto';

@Controller('users')
export class UserController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();
    return users.map(function (user) {
      return UserResponseMapper.map(user);
    });
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<UserResponseDto> {
    const user = await this.userService.getById(id);
    return UserResponseMapper.map(user);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userService.createFromRequest(createUserDto);
    return UserResponseMapper.map(user);
  }
}
