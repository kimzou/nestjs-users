import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './user.inputs';
// import { User } from './user.entity';
import { User, UserDocument } from './user.model';

@Injectable()
export class UsersService {
  // private readonly users: User[] = [
  //   { id: 1, name: 'Eren' },
  //   { id: 2, name: 'Mikasa' }
  // ];
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async all(): Promise<User[]> {
    // return await this.userModel.find();
    const users = await this.userModel.find();
    console.log({users})
    return users;
  }

  async create(createUserDto: CreateUserInput): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    console.log({createdUser})
    return createdUser.save();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    console.log({user})
    return user;
  }
}