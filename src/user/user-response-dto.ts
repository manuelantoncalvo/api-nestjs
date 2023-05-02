export class UserResponseDto {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  address: { street: string; city: string; country: string };
}
