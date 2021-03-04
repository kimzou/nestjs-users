import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './user.input';
import { User, UserDocument } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async all(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async create(createUserDto: CreateUserInput): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findById(id: string): Promise<User|null> {
    const user = await this.userModel.findById(id);
    return user;
  }
  // find  user for a post
  async forPosts(id: string): Promise<User> {
    const user = await this.userModel.findById(id)
    console.log({user})
    return user
  }



  // async register(registerInput: RegisterInput) {
  //   const { name, email, password } = registerInput;

  //   const userExists = await this.userModel.findOne({ email });
  //   if (userExists) throw new Error('This email is already used')

  //   const cryptPassword = await bcrypt.hash(password, 10);
  //   registerInput.password = cryptPassword;

  //   const createdUser = new this.userModel(registerInput);
  //   await createdUser.save()
  // }
}