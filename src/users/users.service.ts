import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  // async create(createUserDto: CreateUserInput): Promise<User> {
  //   const createdUser = new this.userModel(createUserDto);
  //   console.log({createdUser})
  //   return createdUser.save();
  // }

  async findById(id: string): Promise<User> {
    // const user = await this.userModel.findOne({ _id: id }).exec();
    const user = await this.userModel.findById(id);
    console.log({user})
    return user;
    // return await this.userModel.findById(id);
    // return await this.userModel.findOne({ _id: id });
    // return this.users.filter(user => user.id === id)[0];
  }
}