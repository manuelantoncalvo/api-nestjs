import { User } from '../user/user.entity';
import { UserResponseDto } from '../user/user-response-dto';

export class UserResponseMapper {
  public static map(user: User): UserResponseDto {
    return <UserResponseDto>{
      id: user.id,
      username: user.username,
      first_name: user.profile.first_name,
      last_name: user.profile.last_name,
      address: {
        street: user.profile.address.street,
        city: user.profile.address.city.name,
        country: user.profile.address.city.country.name,
      },
    };
  }
}
