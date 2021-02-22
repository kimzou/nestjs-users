import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthenticationError } from 'apollo-server-express';
import bcrypt from 'bcrypt';
import * as admin from 'firebase-admin';
import { Model } from 'mongoose';
import { CreateUserInput, LoginInput, RegisterInput } from './user.inputs';
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

  async findById(id: string): Promise<User|null> {
    const user = await this.userModel.findById(id);
    console.log({user})
    return user;
  }

  async register(registerInput: RegisterInput) {
    const { name, email, password } = registerInput;

    const userExists = await this.userModel.findOne({ email });
    if (userExists) return { error: "This email already exists" }

    const cryptPassword = await bcrypt.hash(password, 10);
    registerInput.password = cryptPassword;

    const createdUser = new this.userModel(registerInput);
    await createdUser.save()

    // const token = sign(
    // )
    return 'lol'
  }

  async login(loginInput: LoginInput) {
    const { email, password } = loginInput;
    admin
      .auth()
      .createSessionCookie
    return 'lol';
  }

  async sessionLogin(idToken: string, ctx): Promise<string> {
    const expiresIn = 60 * 60 * 24 * 7 * 1000 // 7 days
    try {
      const sessionCookie = await admin
        .auth()
        .createSessionCookie(idToken, { expiresIn })
        // console.log({sessionCookie})

      // set the cookie only for this server, but not for the gateway
      const cookieOtp = {
        httpOnly: true,
        maxAge: expiresIn
      }
      ctx.res.cookie('session-cookie', sessionCookie, cookieOtp)
      return sessionCookie;
    } catch (error) {
      throw new AuthenticationError(error);
    }
  }
}