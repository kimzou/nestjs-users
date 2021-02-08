import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    { id: 1, name: 'Eren' },
    { id: 2, name: 'Mikasa' }
  ];

  findById(id: number): User {
    return this.users.filter(user => user.id === id)[0];
  }
}
