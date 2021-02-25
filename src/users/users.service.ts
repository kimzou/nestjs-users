import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthenticationError } from 'apollo-server-express';
import * as admin from 'firebase-admin';
import { Model } from 'mongoose';
import { CreateUserInput } from './user.input';
// import { User, UserRecord } from './user.entity';
import { User, UserDocument } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async all(): Promise<User[]> {
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

  // async register(registerInput: RegisterInput) {
  //   const { name, email, password } = registerInput;

  //   const userExists = await this.userModel.findOne({ email });
  //   if (userExists) throw new Error('This email is already used')

  //   const cryptPassword = await bcrypt.hash(password, 10);
  //   registerInput.password = cryptPassword;

  //   const createdUser = new this.userModel(registerInput);
  //   await createdUser.save()
  // }

  async register({ firebaseUserRecordInput, idToken, ctx }) {
    console.log('register', { firebaseUserRecordInput })
    const { email, uid, displayName } = firebaseUserRecordInput;
    console.log('register', { email, uid, displayName })
    const { passwordHash = '123456' } = await admin.auth().getUser(uid)
    // const userRecord = await (await admin.auth().getUser(uid)).toJSON()
    // console.log({userRecord})
    try {
      await this.session(idToken, ctx)
    } catch (error) {
      console.log('Catch:', error)
    }
    // check is email exists
    const userExists = await this.userModel.findOne({ email });
    if (userExists) throw new Error('This email is already used')
    // set new user property and save it
    const userProp = {
      name: displayName,
      email,
      password: passwordHash,
      firebaseUid: uid
    }
    const createdUser = new this.userModel(userProp);
    await createdUser.save()
    // create the cookie session
    return createdUser;
  }

  // async login(loginInput: LoginInput) {
  //   const { email, password } = loginInput;
  //   admin
  //     .auth()
  //     .createSessionCookie
  //   return 'lol';
  // }

  async login(idToken: string, ctx) {
    console.log('login', {idToken})
    return await this.session(idToken, ctx);
  }

  async session(idToken: string, ctx): Promise<string> {
    console.log('session')
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
      console.log({ sessionCookie })
      return sessionCookie;
    } catch (error) {
      throw new AuthenticationError(error);
    }
  }
}